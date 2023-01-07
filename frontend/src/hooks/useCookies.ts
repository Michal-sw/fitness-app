
const useCookies = () => {

  const setCookie = (cookieKey: String, value: String, daysToExpire: number = 0) => {
    let expires = "";
    if (daysToExpire) {
      const date = new Date();
      date.setTime(date.getTime() + (daysToExpire * 24 * 60 * 60 * 1000));
      expires = "; expires=" + date.toUTCString();
    }

    document.cookie = cookieKey + "=" + (value || "") + expires + "; path=/";  
    console.log(cookieKey + "=" + (value || "") + expires + "; path=/");
  }

  const getCookie = (cookieKey: String) => {
    const cookieName = cookieKey + "=";
    const cookieArray = document.cookie.split(';');

    for (let cookie of cookieArray) {
      while (cookie.charAt(0) === ' ') {
        cookie = cookie.substring(1, cookie.length);
      }
      if (cookie.startsWith(cookieName)) {
        return cookie.substring(cookieName.length, cookie.length);
      }
    }
    return null;  
  }

  return {
    setCookie,
    getCookie
  }
}

export default useCookies;