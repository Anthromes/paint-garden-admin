export default {
  ROUTES: {
    ROOT: '/',
    CANVAS: '/canvas',
    CANVASES: '/canvases',
    NOT_FOUND: '/not-found',
    LOGIN: '/login',
    SECTIONS: '/sections',
    PROJECTS: '/projects',
    POLICY: '/privacyPolicy.pdf',
  },
  API: {
    DB: '/canvas',
    SECTION: '/section',
    UPLOAD: '/upload',
    IMAGE: '/image',
    WEBVIEW: '/webview',
    PIN: '/annotation',
    LOGIN: '/login',
    REGISTER: '/register',
    AUTH_CHECK: '/authcheck',
    PROJECT: '/project',
    LOGOUT: '/logout',
    USER: '/user',
  },
  EDIT_MODES: {
    dnd: 'dnd',
    upload: 'upload',
    resize: 'resize',
    webview: 'webview',
    annotation: 'annotation',
    area: 'area',
  },
  ZOOM_MULTIPLIER: 0.8,
  MAX_ZOOM_LEVEL: 10,
}
