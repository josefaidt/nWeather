const convertUnixDate = UNIX_TIMESTAMP => {
  return new Date(UNIX_TIMESTAMP * 1000).toString()
}

module.exports = {
  convertUnixDate
}