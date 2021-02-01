<!--仪表盘主框架-->
<template>
  <div>
    <el-row>
      <el-col :span="24"><div class="grid-content bg-purple-dark">
        <BugCountWithTester/>
      </div></el-col>
    </el-row>
    <hr style="opacity: 0.3">
    <el-row>
      <el-col :span="12"><div class="grid-content bg-purple">
        <BugTypeCountWithTester/>
      </div></el-col>
      <el-col :span="12"><div class="grid-content bg-purple-light">
        <BugCategoryCountWithTester/>
      </div></el-col>
    </el-row>

  </div>
</template>

<script>
import BugCountWithTester from "@/components/chart/tester/BugCountWithTester";
import BugTypeCountWithTester from "@/components/chart/tester/BugTypeCountWithTester";
import BugCategoryCountWithTester from "@/components/chart/tester/BugCategoryCountWithTester";

export default {
  components: {
    BugCountWithTester,
    BugTypeCountWithTester,
    BugCategoryCountWithTester
  }
};
</script>