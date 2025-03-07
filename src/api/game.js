import service from "../utils/http";

export const getGameService = () => {
    return service.get('/game/acquire')
}

export const addGameService = (data) => {
    return service.post('/game/append', data, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    })
}

export const deleteGameService = (ID) => {
    return service.delete(`/game/delete/${ID}`)
}

export const editGameService = (ID, data) => {
    return service.put(`/game/edit/${ID}`, data, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    })
}

export const showGameService = (gameID) => {
    return service.put('/game/display', gameID)
}