import { createCar } from "../../lib/redis";

export default async function handler(req, res) {
    // req.body is form data
    const id = await createCar(req.body);
    // after createCar repond client with 200 and id
    res.status(200).json({ id })
}