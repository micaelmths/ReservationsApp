import { defineStore } from 'pinia'
import { NotificationStatus, type Notification } from '@/types'
import { v4 as uuid } from 'uuid'
export const useNotificationStore = defineStore('notification', {
  state: () => ({
    notifications: [] as Notification[]
  }),
  actions: {
    addNotification(payload: Notification) {
      const newNotification: Notification = {
        ...payload,
        id: uuid(),
      }
      this.notifications.unshift(newNotification)
      return newNotification
    },
    updateNotificationStatus(notificationId: string, newStatus: NotificationStatus) {
      const notification = this.notifications.find(notification => notification.id == notificationId)
      if (!notification) {
        throw new Error('Notificação não encontrada')
      }
      notification.status = newStatus
    },
    readNotification(notificationId: string) {
      const notification = this.notifications.find(notification => notification.id == notificationId)
      if (!notification) return 'Notificação não encontrada'
      notification.readAt = new Date().toISOString()
    }
  },
  getters: {
    getNotificationsLength: (state) => state.notifications.length,
    unReadNotifications: (state) => state.notifications.filter(notification => !notification.readAt)
  }
})