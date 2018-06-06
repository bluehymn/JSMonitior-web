export function getCsrfToken () {
  let cookie = document.cookie
  let token = cookie.match(/csrfToken=[^=;]+/)
  token = token ? token[0].split('=')[1] : null
  return token
}