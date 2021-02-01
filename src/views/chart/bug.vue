<!--仪表盘主框架-->
<template>
  <div>
    <BugCountWithProject/>
  </div>
</template>

<script>
import BugCountWithProject from "@/components/chart/bug/BugCountWithProject";

export default {
  components: {
    BugCountWithProject,
  }
};
</script>