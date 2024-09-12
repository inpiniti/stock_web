<template>
  <Line :data="datacollection" :options="options" />
</template>

<script setup lang="ts">
import { Line } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement
);

const datacollection = ref({
  labels: ["January", "February", "March", "April", "May", "June", "July"],
  datasets: [
    {
      label: "Data One",
      backgroundColor: "rgba(255, 255, 255, 0.2)", // 라인 색상 변경
      borderColor: "#ffffff", // 라인 색상 변경
      data: [40, 39, 10, 40, 39, 80, 40],
      fill: false,
      tension: 0.4, // 곡선 형태로 만들기 위한 tension 설정
    },
  ],
});

const options = ref({
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: {
      display: false, // x축 라벨 숨기기
    },
    y: {
      display: false, // y축 라벨 숨기기
    },
  },
  plugins: {
    legend: {
      display: false, // 범례 숨기기
    },
  },
});
</script>
