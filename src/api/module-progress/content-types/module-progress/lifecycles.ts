// src/api/module-progress/content-types/module-progress/lifecycles.ts
import { errors } from '@strapi/utils'
const { ApplicationError } = errors

export default {
  // Verhindert doppelte (user × module) Einträge & setzt completed sauber
  async beforeCreate(event) {
    const { data } = event.params
    const userId = data?.users_permissions_user
    const moduleId = data?.module
    if (!userId || !moduleId) return

    const existing = await strapi.entityService.findMany('api::module-progress.module-progress', {
      filters: { users_permissions_user: userId, module: moduleId },
      limit: 1,
    })
    if (existing && existing.length) {
      throw new ApplicationError('Progress for this user & module already exists')
    }

    const vw = !!data.videoWatched
    const qc = !!data.quizCompleted
    data.completed = vw && qc
  },

  // Hält completed bei Updates konsistent
  async beforeUpdate(event) {
    const { data, where } = event.params
    if (!where?.id) return

    if ('videoWatched' in data || 'quizCompleted' in data) {
      const current = await strapi.entityService.findOne('api::module-progress.module-progress', where.id, {
        fields: ['videoWatched', 'quizCompleted', 'completed'],
      })
      const vw = ('videoWatched' in data) ? !!data.videoWatched : !!current?.videoWatched
      const qc = ('quizCompleted' in data) ? !!data.quizCompleted : !!current?.quizCompleted
      data.completed = vw && qc
    }
  },
}
