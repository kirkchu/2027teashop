/* 春水堂菜單資料（依 menu.jpg 逐項整理） */
window.MENU = {
  categories: [
    {
      id: 'world', name: '世界首創', en: 'The Creator of Bubble Tea',
      items: [
        { id: 'd01', name: '珍珠奶茶', en: 'Bubble Tea', cold: { S: 100, M: 190 }, hot: { S: 115, M: 220 } }
      ]
    },
    {
      id: 'shake', name: 'Shake 發源', en: 'The Origin of Handmade Drinks',
      items: [
        { id: 'd02', name: '頂級烏瓦紅茶凍飲', en: 'Uva Black Tea', cold: { S: 85, M: 160 }, hot: { S: 100, M: 190 } }
      ]
    },
    {
      id: 'special', name: '特別推薦', en: 'Special Recommendation',
      items: [
        { id: 'd03', name: '翡翠百香綠茶', en: 'Passion Fruit Premium Jasmine Tea', cold: { S: 120, M: 230 } }
      ]
    },
    {
      id: 'summer', name: '夏限定', en: 'Limited for Summer',
      items: [
        { id: 'd04', name: '四季春冰茶', en: 'Four Seasons Oolong Tea', cold: { S: 90, M: 170 } },
        { id: 'd05', name: '四季春紅柚蜜茶', en: 'Honey Pomelo Four Seasons Oolong Tea', cold: { S: 130, M: 250 } },
        { id: 'd06', name: '紅心芭樂檸檬綠茶', en: 'Pink Guava Lemon Premium Jasmine Tea', cold: { S: 135, M: 260 } }
      ]
    },
    {
      id: 'freshmilk', name: '茶加鮮奶', en: 'Fresh Milk Tea',
      items: [
        { id: 'd07', name: '紅茶拿鐵', en: 'Black Tea Latte', cold: { S: 115, M: 220 }, hot: { S: 125, M: 240 } },
        { id: 'd08', name: '鐵觀音拿鐵', en: 'Tieguanyin Tea Latte', cold: { S: 115, M: 220 }, hot: { S: 125, M: 240 } },
        { id: 'd09', name: '黑糖琥珀珍珠拿鐵', en: 'Brown Sugar Amber Bubble Latte', cold: { S: 130, M: 250 } }
      ]
    },
    {
      id: 'milktea', name: '醇奶茶', en: 'Milk Tea',
      items: [
        { id: 'd10', name: '香醇奶茶', en: 'Black Milk Tea', cold: { S: 95, M: 180 }, hot: { S: 110, M: 210 } },
        { id: 'd11', name: '胚芽奶茶', en: 'Wheat Germ Black Milk Tea', cold: { S: 100, M: 190 }, hot: { S: 115, M: 220 } },
        { id: 'd12', name: '茉香奶茶', en: 'Premium Jasmine Milk Tea', cold: { S: 95, M: 180 }, hot: { S: 110, M: 210 } },
        { id: 'd13', name: '茉奶珍珠', en: 'Bubble Premium Jasmine Milk Tea', cold: { S: 100, M: 190 }, hot: { S: 115, M: 220 } },
        { id: 'd14', name: '鐵觀音奶茶', en: 'Tieguanyin Milk Tea', cold: { S: 95, M: 180 }, hot: { S: 110, M: 210 } },
        { id: 'd15', name: '觀音珍珠奶茶', en: 'Tieguanyin Bubble Milk Tea', cold: { S: 100, M: 190 }, hot: { S: 115, M: 220 } }
      ]
    },
    {
      id: 'pure', name: '純粹茶', en: 'Pure Tea',
      items: [
        { id: 'd16', name: '鐵觀音凍飲', en: 'Tieguanyin Tea', cold: { S: 85, M: 160 } },
        { id: 'd17', name: '翡翠綠茶凍飲', en: 'Premium Jasmine Tea', cold: { S: 90, M: 170 } }
      ]
    },
    {
      id: 'flavored', name: '調和茶', en: 'Flavored Tea',
      items: [
        { id: 'd18', name: '珍珠紅茶', en: 'Bubble Black Tea', cold: { S: 90, M: 170 } },
        { id: 'd19', name: '珍珠翡翠綠茶', en: 'Bubble Premium Jasmine Tea', cold: { S: 90, M: 170 } },
        { id: 'd20', name: '冰梅凍飲', en: 'Plum Black Tea', cold: { S: 95, M: 180 }, hot: { S: 110, M: 210 } },
        { id: 'd21', name: '蜂蜜翡翠綠茶', en: 'Honey Premium Jasmine Tea', cold: { S: 95, M: 180 } },
        { id: 'd22', name: '翡翠檸檬綠茶', en: 'Lemon Premium Jasmine Tea', cold: { S: 110, M: 210 } }
      ]
    },
    {
      id: 'nontea', name: '無茶類', en: 'Non-Tea Drinks',
      items: [
        { id: 'd23', name: '檸檬蜜凍飲', en: 'Honey Lemon Drink', cold: { S: 105, M: 200 } },
        { id: 'd24', name: '檸檬蘆薈凍飲', en: 'Aloe Lemonade', cold: { S: 110, M: 210 } },
        { id: 'd25', name: '蜂蜜拿鐵', en: 'Honey Latte', cold: { S: 115, M: 220 }, hot: { S: 125, M: 240 } }
      ]
    },
    {
      id: 'pot', name: '文人茶', en: 'Pot of Tea',
      items: [
        { id: 'd26', name: '萬壽菊（無茶）', en: "Lemmons' Marigold (Caffeine-Free)", hot: { single: 220 }, noSugar: true },
        { id: 'd27', name: '白毫萬壽菊', en: "White-Tip Oolong Tea with Lemmons' Marigold", hot: { single: 220 }, noSugar: true },
        { id: 'd28', name: '金萱萬壽菊', en: "Jin-Xuan Oolong Tea with Lemmons' Marigold", hot: { single: 220 }, noSugar: true },
        { id: 'd29', name: '高山金萱', en: 'Jin-Xuan Oolong Tea', hot: { single: 220 }, noSugar: true },
        { id: 'd30', name: '高山焙火烏龍', en: 'Roasted Oolong Tea', hot: { single: 220 }, noSugar: true },
        { id: 'd31', name: '白毫烏龍', en: 'Oriental Beauty Tea (White-Tip Oolong Tea)', hot: { single: 220 }, noSugar: true },
        { id: 'd32', name: '文山包種茶', en: 'Wenshan Pouchong Oolong Tea', hot: { single: 220 }, noSugar: true }
      ]
    },
    {
      id: 'snack', name: '茶點心', en: 'Tea Snacks',
      items: [
        { id: 'd33', name: '三沾小麻吉', en: 'Brown Sugar Mochi', single: 85 }
      ]
    },
    {
      id: 'soup', name: '盅湯品', en: 'Soup',
      items: [
        { id: 'd34', name: '當歸藥膳湯', en: 'Chinese Herbal Soup', single: 180 },
        { id: 'd35', name: '金萱剝皮辣椒雞湯', en: 'Peeled Chili Pepper Chicken Soup', single: 195 }
      ]
    },
    {
      id: 'platter', name: '拼盤', en: 'Platter',
      items: [
        { id: 'f01', name: '雙拼燒賣（珍珠丸＋蝦仁）', en: 'Shumai Duet with Shrimp and Rice Meatballs', single: 195 },
        { id: 'f02', name: '招牌滷味豆干米血', en: 'Braised Bean Curd & Rice Cake', single: 195 },
        { id: 'f03', name: '烏龍豆干米血（沙茶柴魚醬）', en: 'Oolong Bean Curd & Rice Cake (Bonito Flakes Sauce)', single: 195 }
      ]
    },
    {
      id: 'steamed', name: '蒸物', en: 'Steamed Dishes',
      items: [
        { id: 'f04', name: '金菇豆皮', en: 'Enoki Mushrooms and Tofu Skin', single: 105 },
        { id: 'f05', name: '珍珠燒賣', en: 'Sticky Rice Meatballs', single: 105 },
        { id: 'f06', name: '蝦仁燒賣', en: 'Shrimp Shumai', single: 105 },
        { id: 'f07', name: '古早味蘿蔔糕（蒸）', en: 'Traditional Turnip Cake', single: 110 }
      ]
    },
    {
      id: 'fried', name: '炸物', en: 'Deep Fried Dishes',
      items: [
        { id: 'f08', name: '黃金花枝蝦排', en: 'Golden Cuttlefish Shrimp Cutlets', single: 175 },
        { id: 'f09', name: '黃金煉乳饅頭', en: 'Buns with Condensed Milk', single: 105 },
        { id: 'f10', name: '黃金脆皮薯條', en: 'French Fries', single: 105 },
        { id: 'f11', name: '金沙芋泥丸', en: 'Taro with Egg Custard Ball', single: 110 },
        { id: 'f12', name: '招牌蘿蔔糕（煎）', en: 'Turnip Cake', single: 115 },
        { id: 'f13', name: '黃金香酥雞', en: 'Deep Fried Chicken', single: 120 },
        { id: 'f14', name: '經典炸翅膀', en: 'Classic Fried Chicken Wings', single: 125 }
      ]
    },
    {
      id: 'braised', name: '滷、煮物', en: 'Boiled Food & Braised Dishes',
      items: [
        { id: 'f15', name: '茶香高麗菜', en: 'Braised Cabbage with Green Tea', single: 100 },
        { id: 'f16', name: '古早味地瓜葉', en: 'Sweet Potato Leaves Cooked with Red Onions', single: 100 },
        { id: 'f17', name: '招牌米血', en: 'Signature Braised Rice Cake', single: 105 },
        { id: 'f18', name: '烏龍米血（沙茶柴魚醬）', en: 'Oolong Rice Cake (Bonito Flakes Sauce)', single: 105 },
        { id: 'f19', name: '招牌豆干', en: 'Signature Braised Bean Curd', single: 105 },
        { id: 'f20', name: '烏龍豆干（沙茶柴魚醬）', en: 'Oolong Bean Curd (Bonito Flakes Sauce)', single: 105 },
        { id: 'f21', name: '鮮肉紅油抄手', en: 'Spicy Wontons in Chili Oil', single: 115 },
        { id: 'f22', name: '茶香螺皇鳳爪', en: 'Braised Chicken Feet', single: 115 },
        { id: 'f23', name: '胡麻拌豚五花', en: 'Sesame Dressing Pork Belly', single: 135 },
        { id: 'f24', name: '椒麻拌豚五花', en: 'Chili Sesame Dressing Pork Belly', single: 135 }
      ]
    },
    {
      id: 'set', name: '精選套餐', en: 'Select Sets',
      items: [
        { id: 'f25', name: '醬燒黃燜雞套餐', en: 'Braised Chicken in Soy Sauce Set', single: 390 },
        { id: 'f26', name: '古早味虱目魚套餐', en: 'Vintage Milkfish Set', single: 370 }
      ]
    },
    {
      id: 'chef', name: '私房特餐', en: 'Specialty Dishes',
      items: [
        { id: 'f27', name: '私房肉排蓋飯', en: 'Soy Sauce Braised Pork Chop Donburi', single: 258 }
      ]
    },
    {
      id: 'traditional', name: '傳統飽食', en: 'Traditional Dishes',
      items: [
        { id: 'f28', name: '古早味蜜醬肉圓', en: 'Taiwanese Meatball', single: 115 },
        { id: 'f29', name: '手工麻香麵線', en: 'Handmade Thin Noodles with Sesame Oil', single: 115 },
        { id: 'f30', name: '手工素麵線（麻香）', en: 'Handmade Thin Noodles (Vegetarian)', single: 115 },
        { id: 'f31', name: '五香素麵', en: 'Vegetarian Noodles', single: 115 },
        { id: 'f32', name: '功夫麵', en: 'Kung-Fu Noodles', single: 120 },
        { id: 'f33', name: '胡麻豆漿擔擔麵', en: 'Sesame Soy Milk Dan-dan Noodles', single: 130 },
        { id: 'f34', name: '椒麻豆漿擔擔麵', en: 'Chili Soy Milk Dan-dan Noodles', single: 130 },
        { id: 'f35', name: '麻油雞紅藜麥油飯', en: 'Sesame Oil Chicken with Red Quinoa Rice', single: 130 },
        { id: 'f36', name: '御品牛肉麵', en: 'Braised Beef Noodle Soup', single: 265 },
        { id: 'f37', name: '酸菜白肉湯麵', en: 'Pickled Cabbage and Sliced Boiled Pork Noodle Soup', single: 310 }
      ]
    },
    {
      id: 'partner', name: '搭配好夥伴', en: 'Delicious Recommendation',
      items: [
        { id: 'f38', name: '滷蛋', en: 'Braised Egg', single: 20 }
      ]
    },
    {
      id: 'addon', name: '加點', en: 'Add-ons',
      items: [
        { id: 'a01', name: '珍珠（粉圓）', en: 'Tapioca Pearls', single: 15 },
        { id: 'a02', name: '胚芽', en: 'Wheat Germ', single: 15 },
        { id: 'a03', name: '檸檬原汁', en: 'Lemon Juice', single: 15 },
        { id: 'a04', name: '白飯', en: 'White Rice', single: 15 }
      ]
    }
  ]
};

window.SUGAR_OPTIONS = ['標準糖', '八分糖', '五分糖', '三分糖', '一分糖', '不糖'];
window.ICE_OPTIONS = ['標準冰', '少冰', '去冰'];
