export default async function handler(req, res) {
  const activityResponse = await fetch(`http://www.boredapi.com/api/activity/`);
  const activityResult = await activityResponse.json();
  
  if (activityResponse.status !== 200) {
    res.status(activityResult.statusCode);
    res.json(activityResult);
    
    return;
  }
  
  res.json(activityResult);
}
