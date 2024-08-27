import type { CommentState } from '@/types'
import { defineStore } from 'pinia'
export const useCommentStore = defineStore('comment', {
  state: (): CommentState => ({
    comment: ''
  }),
  actions: {
    updateComment(comment: string): void {
      this.comment = comment
    },
    resetComment(): void {
      this.comment = ''
    }
  }
})
