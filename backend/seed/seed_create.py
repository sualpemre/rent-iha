import json,os
from django.contrib.auth.hashers import make_password
from datetime import datetime
from django.conf import settings

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.core.settings')
settings.configure()

seed_data = [
    {
        "model": "identity.role",
        "pk": 1,
        "fields": {
          "is_active": True,
          "role_name": "Default",
          "role_description": "Default User",
          "created_at": datetime.utcnow().strftime('%Y-%m-%dT%H:%M:%SZ'),
          "updated_at": datetime.utcnow().strftime('%Y-%m-%dT%H:%M:%SZ') 
        }
    },    
    {
        "model": "identity.role",
        "pk": 2,
        "fields": {
            "is_active": True,
            "role_name": "Admin",
            "role_description": "Admin User",
            "created_at": datetime.utcnow().strftime('%Y-%m-%dT%H:%M:%SZ'),
            "updated_at": datetime.utcnow().strftime('%Y-%m-%dT%H:%M:%SZ')
        }
    },
    {
        "model": "identity.user",
        "pk": 1,
        "fields": {
            "is_active": True,
            "email": "admin@example.com",
            "name": "Baykar",
            "surname": "Admin",
            "password": make_password("admin"),
            "role_id": 2,
            "created_at": datetime.utcnow().strftime('%Y-%m-%dT%H:%M:%SZ'),
            "updated_at": datetime.utcnow().strftime('%Y-%m-%dT%H:%M:%SZ')
        }
    },
    {
        "model": "identity.user",
        "pk": 1,
        "fields": {
            "is_active": True,
            "email": "default@example.com",
            "name": "Baykar",
            "surname": "Default",
            "password": make_password("default"),
            "role_id": 1,
            "created_at": datetime.utcnow().strftime('%Y-%m-%dT%H:%M:%SZ'),
            "updated_at": datetime.utcnow().strftime('%Y-%m-%dT%H:%M:%SZ')
        }
    },
    {
        "model": "aircraft.aircraft",
        "pk": 1,
        "fields": {
            "is_active": True,
            "aircraft_name": "Bayraktar Mini IHA",
            "aircraft_description": "Bayraktar Mini İHA (İnsansız Hava Aracı), Baykar Savunma tarafından geliştirilen ve üretilen bir insansız hava aracıdır. Türkiye'nin milli savunma sanayiinde yerli olarak geliştirilen ve üretilen bu İHA, genellikle askeri amaçlar için kullanılmaktadır.",
            "created_at": datetime.utcnow().strftime('%Y-%m-%dT%H:%M:%SZ'),
            "updated_at": datetime.utcnow().strftime('%Y-%m-%dT%H:%M:%SZ')
        }
    },
    {
        "model": "aircraft.aircraft",
        "pk": 2,
        "fields": {
            "is_active": True,
            "aircraft_name": "Raven",
            "aircraft_description": "Raven, AeroVironment şirketi tarafından üretilen bir mini İnsansız Hava Aracı (İHA)'dır. Raven, Amerika Birleşik Devletleri Silahlı Kuvvetleri ve diğer bazı ülkelerin askeri ve güvenlik güçleri tarafından kullanılmaktadır.",
            "created_at": datetime.utcnow().strftime('%Y-%m-%dT%H:%M:%SZ'),
            "updated_at": datetime.utcnow().strftime('%Y-%m-%dT%H:%M:%SZ')
        }
    },
    {
        "model": "aircraft.aircraft",
        "pk": 3,
        "fields": {
            "is_active": True,
            "aircraft_name": "Skylark",
            "aircraft_description": "Skylark, bir mini insansız hava aracı (İHA) sistemidir ve Elbit Systems tarafından geliştirilmiştir. İsrail Savunma Kuvvetleri ve diğer çeşitli ülkelerin askeri ve güvenlik birimleri tarafından kullanılmaktadır. Skylark, genellikle keşif, izleme, gözetleme ve hedef belirleme gibi görevlerde kullanılmaktadır.",
            "created_at": datetime.utcnow().strftime('%Y-%m-%dT%H:%M:%SZ'),
            "updated_at": datetime.utcnow().strftime('%Y-%m-%dT%H:%M:%SZ')
        }
    },
    {
        "model": "aircraft.PropertyRule",
        "pk": 1,
        "fields": {
            "is_active": True,
            "rule_name": "Üretici Ülke",
            "rule_description": "Hava Aracını Üreten Ülkenin Adı",
            "created_at": datetime.utcnow().strftime('%Y-%m-%dT%H:%M:%SZ'),
            "updated_at": datetime.utcnow().strftime('%Y-%m-%dT%H:%M:%SZ')
        }
    },
    {
        "model": "aircraft.PropertyRule",
        "pk": 2,
        "fields": {
            "is_active": True,
            "rule_name": "Firma Adı",
            "rule_description": "Hava Aracını Üreten Firmanın Adı",
            "created_at": datetime.utcnow().strftime('%Y-%m-%dT%H:%M:%SZ'),
            "updated_at": datetime.utcnow().strftime('%Y-%m-%dT%H:%M:%SZ')
        }
    },
    {
        "model": "aircraft.PropertyRule",
        "pk": 3,
        "fields": {
            "is_active": True,
            "rule_name": "Operasyonel İrtifa (m)",
            "rule_description": "Operasyonel İrtifa, hava aracının düzenli uçuşlar sırasında sahip olduğu irtifadır.",
            "created_at": datetime.utcnow().strftime('%Y-%m-%dT%H:%M:%SZ'),
            "updated_at": datetime.utcnow().strftime('%Y-%m-%dT%H:%M:%SZ')
        }
    },
    {
        "model": "aircraft.PropertyRule",
        "pk": 4,
        "fields": {
            "is_active": True,
            "rule_name": "Uçuş Menzili (km)",
            "rule_description": "Uçuş Menzili, bir hava aracının belirli bir yakıt miktarıyla veya belirli bir pil şarjıyla ne kadar mesafe kat edebileceğini belirten bir ölçümdür.",
            "created_at": datetime.utcnow().strftime('%Y-%m-%dT%H:%M:%SZ'),
            "updated_at": datetime.utcnow().strftime('%Y-%m-%dT%H:%M:%SZ')
        }
    },
    {
        "model": "aircraft.PropertyRule",
        "pk": 5,
        "fields": {
            "is_active": True,
            "rule_name": "Uçuş Süresi (dk.)",
            "rule_description": "Uçuş Süresi, bir hava aracının kalkıştan inişe kadar olan toplam süresini ifade eder.",
            "created_at": datetime.utcnow().strftime('%Y-%m-%dT%H:%M:%SZ'),
            "updated_at": datetime.utcnow().strftime('%Y-%m-%dT%H:%M:%SZ')
        }
    },
    {
        "model": "aircraft.PropertyRule",
        "pk": 6,
        "fields": {
            "is_active": True,
            "rule_name": "Faydalı Yükler",
            "rule_description": "Hava aracının taşıdığı ve genellikle belirli bir amaca hizmet eden ekipman",
            "created_at": datetime.utcnow().strftime('%Y-%m-%dT%H:%M:%SZ'),
            "updated_at": datetime.utcnow().strftime('%Y-%m-%dT%H:%M:%SZ')
        }
    },
    {
        "model": "aircraft.PropertyRule",
        "pk": 7,
        "fields": {
            "is_active": True,
            "rule_name": "İniş Türü",
            "rule_description": "İniş Türü, bir hava aracının kalkıştan sonra havaalanına geri dönüş ve yer yüzeyine güvenli bir şekilde inmesi için kullanılan teknikleri ifade eder",
            "created_at": datetime.utcnow().strftime('%Y-%m-%dT%H:%M:%SZ'),
            "updated_at": datetime.utcnow().strftime('%Y-%m-%dT%H:%M:%SZ')
        }
    },
    {
        "model": "aircraft.PropertyRule",
        "pk": 8,
        "fields": {
            "is_active": True,
            "rule_name": "Kalkış Türü",
            "rule_description": "Kalkış Türü, bir hava aracının yer yüzeyinden havalanması için kullanılan teknikleri ifade eder.",
            "created_at": datetime.utcnow().strftime('%Y-%m-%dT%H:%M:%SZ'),
            "updated_at": datetime.utcnow().strftime('%Y-%m-%dT%H:%M:%SZ')
        }
    },
    {
        "model": "aircraft.PropertyRule",
        "pk": 9,
        "fields": {
            "is_active": True,
            "rule_name": "Otomatik Yönlenen Anten Sistemi",
            "rule_description": "İHA'nın uçuş sırasında sürekli olarak iletişimde kalmasını sağlamak veya belirli bir sinyali algılamak ve takip etmek için kullanılır.",
            "created_at": datetime.utcnow().strftime('%Y-%m-%dT%H:%M:%SZ'),
            "updated_at": datetime.utcnow().strftime('%Y-%m-%dT%H:%M:%SZ')
        }
    },
    {
        "model": "aircraft.PropertyRule",
        "pk": 10,
        "fields": {
            "is_active": True,
            "rule_name": "GPS Bağımsızlığı",
            "rule_description": "GPS bağımsızlığı, İHA'ların GPS sinyalleri olmadan da güvenli bir şekilde uçabileceği ve görevlerini yerine getirebileceği anlamına gelir.",
            "created_at": datetime.utcnow().strftime('%Y-%m-%dT%H:%M:%SZ'),
            "updated_at": datetime.utcnow().strftime('%Y-%m-%dT%H:%M:%SZ')
        }
    },
    {
        "model": "aircraft.PropertyRule",
        "pk": 11,
        "fields": {
            "is_active": True,
            "rule_name": "Otomatik Viril, Stall Durumlarından Kurtarma",
            "rule_description": "Bu sistemler, hava aracının durumunu sürekli olarak izler ve belirli sınırların dışına çıktığında otomatik olarak müdahale eder.",
            "created_at": datetime.utcnow().strftime('%Y-%m-%dT%H:%M:%SZ'),
            "updated_at": datetime.utcnow().strftime('%Y-%m-%dT%H:%M:%SZ')
        }
    },
    {
        "model": "aircraft.Property",
        "pk": 1,
        "fields": {
            "property_rule_id": 1,
            "is_active": True,
            "property_value": "Türkiye",
            "property_description": "",
            "created_at": datetime.utcnow().strftime('%Y-%m-%dT%H:%M:%SZ'),
            "updated_at": datetime.utcnow().strftime('%Y-%m-%dT%H:%M:%SZ')
        }
    },
    {
        "model": "aircraft.Property",
        "pk": 2,
        "fields": {
            "property_rule_id": 1,
            "is_active": True,
            "property_value": "ABD",
            "property_description": "",
            "created_at": datetime.utcnow().strftime('%Y-%m-%dT%H:%M:%SZ'),
            "updated_at": datetime.utcnow().strftime('%Y-%m-%dT%H:%M:%SZ')
        }
    },
    {
        "model": "aircraft.Property",
        "pk": 3,
        "fields": {
            "property_rule_id": 1,
            "is_active": True,
            "property_value": "İsrail",
            "property_description": "",
            "created_at": datetime.utcnow().strftime('%Y-%m-%dT%H:%M:%SZ'),
            "updated_at": datetime.utcnow().strftime('%Y-%m-%dT%H:%M:%SZ')
        }
    },
    {
        "model": "aircraft.Property",
        "pk": 4,
        "fields": {
            "property_rule_id": 2,
            "is_active": True,
            "property_value": "Baykar",
            "property_description": "",
            "created_at": datetime.utcnow().strftime('%Y-%m-%dT%H:%M:%SZ'),
            "updated_at": datetime.utcnow().strftime('%Y-%m-%dT%H:%M:%SZ')
        }
    },
    {
        "model": "aircraft.Property",
        "pk": 5,
        "fields": {
            "property_rule_id": 2,
            "is_active": True,
            "property_value": "Aerovironment",
            "property_description": "",
            "created_at": datetime.utcnow().strftime('%Y-%m-%dT%H:%M:%SZ'),
            "updated_at": datetime.utcnow().strftime('%Y-%m-%dT%H:%M:%SZ')
        }
    },
    {
        "model": "aircraft.Property",
        "pk": 6,
        "fields": {
            "property_rule_id": 2,
            "is_active": True,
            "property_value": "Elbit",
            "property_description": "",
            "created_at": datetime.utcnow().strftime('%Y-%m-%dT%H:%M:%SZ'),
            "updated_at": datetime.utcnow().strftime('%Y-%m-%dT%H:%M:%SZ')
        }
    },
    {
        "model": "aircraft.Property",
        "pk": 7,
        "fields": {
            "property_rule_id": 3,
            "is_active": True,
            "property_value": "1000",
            "property_description": "(m)",
            "created_at": datetime.utcnow().strftime('%Y-%m-%dT%H:%M:%SZ'),
            "updated_at": datetime.utcnow().strftime('%Y-%m-%dT%H:%M:%SZ')
        }
    },
    {
        "model": "aircraft.Property",
        "pk": 8,
        "fields": {
            "property_rule_id": 3,
            "is_active": True,
            "property_value": "150",
            "property_description": "(m)",
            "created_at": datetime.utcnow().strftime('%Y-%m-%dT%H:%M:%SZ'),
            "updated_at": datetime.utcnow().strftime('%Y-%m-%dT%H:%M:%SZ')
        }
    },
    {
        "model": "aircraft.Property",
        "pk": 9,
        "fields": {
            "property_rule_id": 3,
            "is_active": True,
            "property_value": "300",
            "property_description": "(m)",
            "created_at": datetime.utcnow().strftime('%Y-%m-%dT%H:%M:%SZ'),
            "updated_at": datetime.utcnow().strftime('%Y-%m-%dT%H:%M:%SZ')
        }
    },
    {
        "model": "aircraft.Property",
        "pk": 10,
        "fields": {
            "property_rule_id": 4,
            "is_active": True,
            "property_value": "15",
            "property_description": "(km)",
            "created_at": datetime.utcnow().strftime('%Y-%m-%dT%H:%M:%SZ'),
            "updated_at": datetime.utcnow().strftime('%Y-%m-%dT%H:%M:%SZ')
        }
    },
    {
        "model": "aircraft.Property",
        "pk": 11,
        "fields": {
            "property_rule_id": 4,
            "is_active": True,
            "property_value": "7",
            "property_description": "(km)",
            "created_at": datetime.utcnow().strftime('%Y-%m-%dT%H:%M:%SZ'),
            "updated_at": datetime.utcnow().strftime('%Y-%m-%dT%H:%M:%SZ')
        }
    },
    {
        "model": "aircraft.Property",
        "pk": 12,
        "fields": {
            "property_rule_id": 4,
            "is_active": True,
            "property_value": "10",
            "property_description": "(km)",
            "created_at": datetime.utcnow().strftime('%Y-%m-%dT%H:%M:%SZ'),
            "updated_at": datetime.utcnow().strftime('%Y-%m-%dT%H:%M:%SZ')
        }
    },
    {
        "model": "aircraft.Property",
        "pk": 13,
        "fields": {
            "property_rule_id": 5,
            "is_active": True,
            "property_value": "60",
            "property_description": "(dk)",
            "created_at": datetime.utcnow().strftime('%Y-%m-%dT%H:%M:%SZ'),
            "updated_at": datetime.utcnow().strftime('%Y-%m-%dT%H:%M:%SZ')
        }
    },
    {
        "model": "aircraft.Property",
        "pk": 14,
        "fields": {
            "property_rule_id": 6,
            "is_active": True,
            "property_value": "EO",
            "property_description": "",
            "created_at": datetime.utcnow().strftime('%Y-%m-%dT%H:%M:%SZ'),
            "updated_at": datetime.utcnow().strftime('%Y-%m-%dT%H:%M:%SZ')
        }
    },
    {
        "model": "aircraft.Property",
        "pk": 15,
        "fields": {
            "property_rule_id": 6,
            "is_active": True,
            "property_value": "IR Kamera",
            "property_description": "",
            "created_at": datetime.utcnow().strftime('%Y-%m-%dT%H:%M:%SZ'),
            "updated_at": datetime.utcnow().strftime('%Y-%m-%dT%H:%M:%SZ')
        }
    }
]


with open('./seed/0001_Seed.json', 'w') as file:
    json.dump(seed_data, file, indent=4)