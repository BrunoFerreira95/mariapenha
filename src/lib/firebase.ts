"use client";

import firebase from 'firebase/app'
import 'firebase/firestore'
import { useEffect, useState } from 'react'
import 'webrtc'
import { firebaseConfig } from './key-firebase';

export function ConnectFirebase() {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
  }
  
  const firestore = firebase.firestore()
  const servers = {
    iceServers: [
      {
        urls: [
          "stun:stun1.l.google.com:19302",
          "stun:stun2.l.google.com:19302",
        ],
      },
    ],
    iceCandidatePoolSize: 10,
  };

  const [pc, setPC] = useState<RTCPeerConnection>();

  useEffect(() => {
    const newpc = new RTCPeerConnection(servers);
    setPC(newpc);
  }, []);
  return { pc, firestore };
}
