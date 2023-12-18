const StandardError = require('../utils/standard-error');
const { getDB } = require('../clients/google-firestore-admin');

class WasteRepository {
    static async getAllWaste() {
        try {
            const DB = await getDB();
            const wasteSnapshot = await DB.collection('waste').get();
            if (!wasteSnapshot.empty) {
                const wasteData = wasteSnapshot.docs.map((doc) => {
                    return {
                        id: doc.id,
                        name: doc.data().name,
                        image: doc.data().image,
                    };
                });
                return wasteData;
            }
        } catch (error) {
            throw new StandardError(
                500,
                'DATABASE_ERROR',
                'Error occured in database',
                error,
            );
        }
    }
    static async getWasteById(id) {
        try {
            const DB = await getDB();
            const wasteSnapshot = await DB.collection('waste').doc(id).get();
            if (wasteSnapshot.exists) {
                return wasteSnapshot.data();
            }
        } catch (error) {
            throw new StandardError(
                500,
                'DATABASE_ERROR',
                'Error occured in database',
                error,
                {
                    id,
                },
            );
        }
    }

    static async getWasteByType(type) {
        try {
            const DB = await getDB();
            const wasteSnapshot = await DB.collection('waste')
                .where('waste_type', '==', type)
                .get();
            if (!wasteSnapshot.empty) {
                const wasteData = wasteSnapshot.docs.map((doc) => {
                    return {
                        id: doc.id,
                        name: doc.data().name,
                        image: doc.data().image,
                    };
                });
                return wasteData;
            }
        } catch (error) {
            throw new StandardError(
                500,
                'DATABASE_ERROR',
                'Error occured in database',
                error,
                {
                    type,
                },
            );
        }
    }

    static async createWasteScanHistory(data, userId) {
        try {
            const DB = await getDB();
            const wasteScanHistoryRef = await DB.collection(
                'waste_scan_history',
            ).add({
                ...data,
                id: DB.collection('waste_scan_history').doc().id,
                user_id: userId,
                created_at: new Date().toISOString(),
            });
            const wasteScanHistory = await wasteScanHistoryRef.get();
            if (wasteScanHistory.exists) {
                return wasteScanHistory.data();
            }
        } catch (error) {
            throw new StandardError(
                500,
                'DATABASE_ERROR',
                'Error occured in database',
                error,
                {
                    data,
                },
            );
        }
    }

    static async getAllWasteScanHistory(userId) {
        try {
            const DB = await getDB();
            const wasteScanHistorySnapshot = await DB.collection(
                'waste_scan_history',
            )
                .where('user_id', '==', userId)
                .get();
            if (!wasteScanHistorySnapshot.empty) {
                const wasteScanHistoryData = wasteScanHistorySnapshot.docs.map(
                    (doc) => {
                        return {
                            id: doc.id,
                            trash_type: doc.data().trash_type,
                            uploaded_image: doc.data().uploaded_image,
                        };
                    },
                );
                return wasteScanHistoryData;
            }
        } catch (error) {
            throw new StandardError(
                500,
                'DATABASE_ERROR',
                'Error occured in database',
                error,
                {
                    userId,
                },
            );
        }
    }

    static async getWasteScanHistoryById(id) {
        try {
            const DB = await getDB();
            const wasteScanHistorySnapshot = await DB.collection(
                'waste_scan_history',
            )
                .doc(id)
                .get();
            if (wasteScanHistorySnapshot.exists) {
                return wasteScanHistorySnapshot.data();
            }
        } catch (error) {
            throw new StandardError(
                500,
                'DATABASE_ERROR',
                'Error occured in database',
                error,
                {
                    id,
                },
            );
        }
    }
}

module.exports = WasteRepository;
