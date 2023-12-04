class WasteModel {
    constructor({
        id,
        name,
        jenis_sampah,
        metode_pemilahan,
        petunjuk_langkah,
        url,
    }) {
        this.id = id;
        this.name = name;
        this.jenis_sampah = jenis_sampah;
        this.metode_pemilahan = metode_pemilahan;
        this.petunjuk_langkah = petunjuk_langkah;
        this.url = url;
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
