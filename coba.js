const { User, Todo, sequelize } = require('./models/index')

async function readUser() {
    try {
        const data = await User.findAll({
            include: [{
                model: Todo,
                as: 'todos'
            }]
        })
        console.log(data)
    } catch (e) {
        console.log('error', e)
    }
}

async function createUser(name) {
    try {
        const data = await User.create({ name })
        console.log(data)
    } catch (e) {
        console.log('error', e)
    }
}

async function readTodo() {
    try {
        const data = await Todo.findAll({
            include: [{
                model: User
            }]
        })
        console.log(data)
    } catch (e) {
        console.log('error', e)
    }
}

async function createTodo(title, executor) {
    try {
        const data = await Todo.create({ title, executor })
        console.log(data)
    } catch (e) {
        console.log('error', e)
    }
}

async function tryTransaction() {
    const t = await sequelize.transaction();

    try {

        const user = await User.create({
            name: 'Superman'
        }, { transaction: t });

        await Todo.create({
            title: 'makan',
            executor: user.id
        }, { transaction: t })

        await t.commit();

    } catch (error) {

        await t.rollback();

    }
}


// tryTransaction()
readTodo()
