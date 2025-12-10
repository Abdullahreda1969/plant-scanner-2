// modules/api-mock.js - محاكاة PlantNet API
export class PlantNetMockAPI {
    constructor() {
        this.mockPlants = [
            {
                id: 1,
                name: "نعناع",
                scientificName: "Mentha spicata",
                confidence: 0.92,
                description: "نبات عشبي معمر ذو رائحة عطرية، يستخدم في الشاي والطبخ.",
                treatment: "الري المنتظم والتعرض لأشعة الشمس غير المباشرة.",
                image: "🌿"
            },
            {
                id: 2,
                name: "ريحان",
                scientificName: "Ocimum basilicum",
                confidence: 0.87,
                description: "نبات عطري يستخدم في المطبخ الإيطالي والآسيوي.",
                treatment: "يتطلب تربة جيدة التصريف ودفئًا.",
                image: "🌱"
            },
            {
                id: 3,
                name: "صبار",
                scientificName: "Aloe vera",
                confidence: 0.95,
                description: "نبات عصاري معروف بخصائصه العلاجية للبشرة.",
                treatment: "ري قليل والتعرض للشمس.",
                image: "🌵"
            }
        ];
    }

    // محاكاة استجابة API
    async identifyPlant(imageData) {
        // محاكاة تأخير الشبكة
        await this.delay(1500);
        
        // اختيار نبات عشوائي من القائمة
        const randomPlant = this.mockPlants[
            Math.floor(Math.random() * this.mockPlants.length)
        ];
        
        return {
            success: true,
            timestamp: new Date().toLocaleString(),
            plant: randomPlant,
            suggestions: [
                "تأكد من سقي النبات بانتظام",
                "وفر ضوءًا كافيًا ولكن غير مباشر",
                "تأكد من تصريف التربة الجيد"
            ]
        };
    }

    // دالة مساعدة للتأخير
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // دالة للحصول على قائمة النباتات
    getAllPlants() {
        return this.mockPlants;
    }
}