<template>
  <q-page>
    <div class="q-pa-md">
      <!-- <q-btn @click="startCamera" label="Start Camera" color="primary" /> -->
      <q-btn @click="captureImage" label="Capture" color="secondary" />

      <video ref="video" width="100%" autoplay></video>

      <div v-if="imageData" class="q-mt-md">
        <img :src="imageData" alt="Captured Image" width="100%" />
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      imageData: null, // Stores the captured image data
    };
  },
  mounted() {
    this.startCamera();
  },
  methods: {
    async startCamera() {
      try {
        // Request access to the camera
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        // Set the video element source to the camera stream
        this.$refs.video.srcObject = stream;
      } catch (error) {
        console.error("Error accessing camera:", error);
      }
    },
    captureImage() {
      // Create a canvas to capture a frame from the video
      const video = this.$refs.video;
      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      // Draw the current video frame on the canvas
      const context = canvas.getContext("2d");
      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      // Save the image data as a base64-encoded URL
      this.imageData = canvas.toDataURL("image/png");
    },
  },
  beforeUnmount() {
    // Stop the camera stream when the component is destroyed
    const stream = this.$refs.video.srcObject;
    if (stream) {
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop());
    }
  },
};
</script>

<style scoped>
video {
  border: 2px solid #ccc;
  border-radius: 8px;
  margin-top: 16px;
}
</style>
