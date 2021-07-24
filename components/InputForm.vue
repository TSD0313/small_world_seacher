<template>
  <div class="container">
    <form>
      <div class="form-group">
        <label for="startCardId">Start Card ID</label>
        <input type="start_id" v-model="start_id" class="form-control" id="startCardId" placeholder="Card ID">
      </div>
      <div class="form-group">
        <label for="goalCardId">Goal Card ID</label>
        <input type="goal_id" v-model="goal_id" class="form-control" id="goalCardId" placeholder="Card ID">
      </div>
      <button v-on:click="search" type="submit" class="btn btn-primary">Search</button>
    </form>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        start_id: "",
        goal_id: "",
      }
    },
    methods: {
      search() {
        
      }
    },
  }
</script>