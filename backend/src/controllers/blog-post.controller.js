import { blogPostService } from '../services/blog-post.service.js'

export async function listBlogPosts(_request, response, next) { try { response.json({ success: true, data: await blogPostService.list() }) } catch (error) { next(error) } }
export async function listPublishedBlogPosts(_request, response, next) { try { response.json({ success: true, data: await blogPostService.listPublished() }) } catch (error) { next(error) } }
export async function getBlogPost(request, response, next) { try { response.json({ success: true, data: await blogPostService.get(request.params.id) }) } catch (error) { next(error) } }
export async function getBlogPostBySlug(request, response, next) { try { response.json({ success: true, data: await blogPostService.getBySlug(request.params.slug) }) } catch (error) { next(error) } }
export async function createBlogPost(request, response, next) { try { response.status(201).json({ success: true, data: await blogPostService.create(request.body) }) } catch (error) { next(error) } }
export async function updateBlogPost(request, response, next) { try { response.json({ success: true, data: await blogPostService.update(request.params.id, request.body) }) } catch (error) { next(error) } }
export async function deleteBlogPost(request, response, next) { try { response.json({ success: true, data: await blogPostService.remove(request.params.id) }) } catch (error) { next(error) } }
