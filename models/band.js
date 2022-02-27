const { v4: uuid } = require('uuid');

class Band {
    constructor(name = 'sin nombre') {
        this.id = uuid()
        this.name = name;
        this.votes = 0;
    }
}

module.exports = Band;
