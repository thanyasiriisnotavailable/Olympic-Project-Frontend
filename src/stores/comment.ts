import { defineStore } from 'pinia'

export const useCommentStore = defineStore('comment', {
  state: () => ({
    comments: {} as Record<string, string[]> // Object to hold comments for each country
  }),
  actions: {
    addComment(countryId: string, comment: string): void {
      if (comment.trim()) {
        if (!this.comments[countryId]) {
          this.comments[countryId] = []
        }
        this.comments[countryId].push(comment)
      }
    }
  }
})
