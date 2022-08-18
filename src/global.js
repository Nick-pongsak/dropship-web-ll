window.deviceType = () => {
  const ua = navigator.userAgent;
  if (/(tablet|ipad|iPad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
    return "tablet";
  }
  else if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
    return "mobile";
  }
  return "desktop";
}
window.currency = (val) => {
  let value = parseFloat(val)
  if (Number.isInteger(value)) {
    return parseFloat(value).toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  } else {
    return val
  }
}