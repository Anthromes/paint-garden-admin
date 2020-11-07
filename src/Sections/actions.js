import actionTypes from '../constants/actionTypes'
import api from '../utils/api'
import Constants from '../constants'

const {
  API: { DB, SECTION, IMAGE },
} = Constants

export function fetchData(project_id) {
  return dispatch => api.get(`${DB}/${project_id}`).then(resp => dispatch(updateDb(resp.data.data)))
}

export function createSection(data, project_id, canvas_id) {
  return dispatch =>
    api
      .post(SECTION, {
        ...data,
        position: {
            x: 0,
            y: 0,
        },
        project_id: project_id,
        canvas_id: canvas_id,
      })
      .then(resp => dispatch({ type: actionTypes.CREATE_SECTION, section: { ...resp.data.data, imageIds: [] } }))
}

export function addToCanvas(section) {
  return (dispatch, getState) => {
    const images = getState().images
    const activeImage = images.find(im => im.id === section.imageIds[section.imageIds.length - 1])
    return api
        .put(`${SECTION}/${section.id}`, {
            position: {
                x: 0,
                y: 0,
            },
            dimensions: {
                width: section.width || activeImage.width,
                height: activeImage.height,
            },
            canvas: true,
        })
      .then(resp => dispatch(updateSectionsAction(resp.data.data)))
  }
}

export function removeFromCanvas(sectionId) {
  return dispatch =>
    api.put(`${SECTION}/${sectionId}`, { canvas: false }).then(resp => dispatch(updateSectionsAction(resp.data.data)))
}

export function deleteSection(id) {
  return dispatch =>
    api.delete(`${SECTION}/${id}`).then(resp =>
      dispatch({
        type: actionTypes.DELETE_SECTION,
        id,
      }),
    )
}

export function deleteImage(id) {
  return dispatch =>
    api.delete(`${IMAGE}/${id}`).then(resp =>
      dispatch({
        type: actionTypes.DELETE_IMAGE,
        id,
      }),
    )
}

export function updateSection(data) {
  return dispatch => api.put(`${SECTION}/${data.id}`, data).then(resp => dispatch(updateSectionsAction(resp.data.data)))
}

export function uploadImages(files, sectionId, projectId) {
  return dispatch => {
    const formData = new FormData()
    for (var i = 0; i < files.length; i++) {
      const file = files[i]
      // Check the file type.
      if (!file.type.includes('image') && !file.type.includes('video')) {
        // skip the API call for non-image or non-video file types
        // TODO: implement an error notification for a user for this case
        return
      }
      // Add the file to the request.
      formData.append('images[]', file, file.name)
    }
    formData.append('sectionId', sectionId)
    formData.append('projectId', projectId)
    return api.post('/image', formData, { headers: { 'Content-Type': 'multipart/form-data' } }).then(resp =>
      dispatch({
        type: actionTypes.CREATE_IMAGE,
        images: resp.data.data,
        sectionId,
      }),
    )
  }
}

const updateDb = ({ images, sections, project, annotations, user }) => ({
  type: actionTypes.UPDATE_DB,
  images,
  sections,
  project,
  user,
  pins: annotations,
})

export const clearData = () => {
  return {
    type: 'CLEAR',
  }
}

const updateSectionsAction = section => ({
  type: actionTypes.UPDATE_SECTION,
  section: { ...section, imageIds: section.imageIds || [] },
})
