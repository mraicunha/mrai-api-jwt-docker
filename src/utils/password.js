const bcrypt = require('bcrypt')

module.exports = {
  async generateHash (passwordCandidate) {
    try {
      const hash = await bcrypt.hash(passwordCandidate, 12)
      return hash
    } catch (error) {
      console.log(error)

      return error
    }
  },
  async compareHash (passwordCandidate, hash) {
    console.log(passwordCandidate, hash)

    try {
      const match = await bcrypt.compare(passwordCandidate, hash)
      if (match) {
        return true
      } else {
        return false
      }
    } catch (error) {
      return error
    }
  }
}
