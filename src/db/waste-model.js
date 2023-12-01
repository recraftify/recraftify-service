class WasteModel {
    constructor({ id, name, description, image, createdAt, updatedAt }) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.image = image;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}

class LoggingScanModel {
    constructor({ id, wasteId, userId, createdAt, updatedAt }) {
        this.id = id;
        this.wasteId = wasteId;
        this.userId = userId;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}

module.exports = { WasteModel, LoggingScanModel };
