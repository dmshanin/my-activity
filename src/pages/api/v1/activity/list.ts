const enum EActivityType {
    Education = 0,
    Recreational = 1,
    Social = 2,
    Diy = 3,
    Charity = 4,
    Cooking = 5,
    Relaxation = 6,
    Music = 7,
    Busywork = 8
}

const activityTypeList = ["education", "recreational", "social", "diy", "charity", "cooking", "relaxation", "music", "busywork"]

export default async function handler(req, res) {
    const { method, body, headers, query } = req;
    const activityList = [];

    try {
        for (var i = 0; i < activityTypeList.length; i++) {
            const response = await fetch(`http://www.boredapi.com/api/activity?type=${activityTypeList[i]}`);
            const newActivityItem = await response.json();
    
            activityList.push(newActivityItem);
        }

        res.json(activityList);
    } catch (error) {
        const result = await error.json();

        if (error.status !== 200) {
            res.status(result.statusCode);
            res.json(result);
            
            return;
        }
    }
}
  