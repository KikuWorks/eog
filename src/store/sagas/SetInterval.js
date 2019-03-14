import { eventChannel } from 'redux-saga'
import React from 'react'

export default function* countDown(secs) {
    return eventChannel((emitter) => {
        const iv = setInterval(() => {
            emitter(secs)
        }, secs);
        // The subscriber must return an unsubscribe function
        return () => {
          clearInterval(iv)
        }
      }
    )
  }

