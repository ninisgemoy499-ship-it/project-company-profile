import { contactMessageService } from '../services/contact-message.service.js'

export async function listContactMessages(_request, response, next) {
  try {
    response.json({ success: true, data: await contactMessageService.list() })
  } catch (error) {
    next(error)
  }
}

export async function getContactMessage(request, response, next) {
  try {
    response.json({ success: true, data: await contactMessageService.get(request.params.id) })
  } catch (error) {
    next(error)
  }
}

export async function createContactMessage(request, response, next) {
  try {
    const data = await contactMessageService.create(request.body)
    response.status(201).json({ success: true, data })
  } catch (error) {
    next(error)
  }
}

export async function updateContactMessage(request, response, next) {
  try {
    response.json({ success: true, data: await contactMessageService.update(request.params.id, request.body) })
  } catch (error) {
    next(error)
  }
}

export async function deleteContactMessage(request, response, next) {
  try {
    response.json({ success: true, data: await contactMessageService.remove(request.params.id) })
  } catch (error) {
    next(error)
  }
}