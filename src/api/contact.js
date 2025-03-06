import service from "../utils/http";

export const changeContactService = (data) => {
    return service.put('/contact/edit', data)
}

export const getContactService = () => {
    return service.get('/contact/acquire')
}