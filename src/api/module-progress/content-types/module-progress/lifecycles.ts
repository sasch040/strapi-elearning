import { errors } from '@strapi/utils'
const { ApplicationError } = errors

export default {
  async beforeCreate(event) {
    const { data } = event.params
    const userId = data?.users_permissions_user
    const moduleId = data?.module
    if (!userId || !moduleId) return

    // exakt ein Eintrag pro (User × Modul)
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
