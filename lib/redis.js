import { Client, Entity, Schema, Repository } from "redis-om";

// main entry point
const client = new Client()

async function connect() {
    if (!client.isOpen()) {
        await client.open(process.env.REDIS_URL)
    }
}

class Car extends Entity { }
let schema = new Schema(
    Car,
    {
        make: { type: 'string' },
        model: { type: 'string' },
        image: { type: 'string' },
        description: { type: 'string', textSearch: true },
    },
    {
        dataStructure: 'JSON',
    }
)

export async function createCar(data) {
    await connect()
    
    const repository = new Repository(schema, client)

    const car = repository.createEntity(data)

    // unique id returned from database, car:xxxxxxxxxxxxxxx
    const id = await repository.save(car)

    return id
}

export async function createIndex() {
    await connect()

    const repository = new Repository(schema, client)
    await repository.createIndex()
}


export async function searchCars(query) {
    await connect()

    const repository = new Repository(schema, client)

    const cars = await repository.search()
    .where('make').eq(query)
    .or('model').eq(query)
    .or('description').matches(query)
    .return.all();

    return cars
}


