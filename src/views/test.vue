
<template>
	<div id="app" class="container my-3">
  <div class="row">
    <div class="col-12 text-center">
      <h1 class="mb-3">Upload Image</h1>
	  <button @click="up"> Upload </button>
    </div>
    <div class="col-md-5 offset-md-1">
      <h5>1. single file</h5>

      <form enctype="multipart/form-data">
        <div class="form-group">
          <label for="my-file">Select Image</label>
          <input type="file" accept="image/*" @change="previewImage" class="form-control-file" id="my-file">
    
          <div class="border p-2 mt-3">
            <p>Preview Here:</p>
            <template v-if="preview">
              <img :src="preview" class="img-fluid" />
              <p class="mb-0">file name: {{ image.name }}</p>
              <p class="mb-0">size: {{ image.size/1024 }}KB</p>
            </template>
          </div>
        </div>
      </form>
    </div>
    
    <div class="col-md-5">
      <h5>2. multiple file</h5>
        <div class="form-group">
          <label for="my-file">Select Image</label>
          <input type="file" accept="image/*" multiple="multiple" @change="previewMultiImage" class="form-control-file" id="my-file">
    
          <div class="border p-2 mt-3">
            <p>Preview Here:</p>
            <template v-if="preview_list.length">
              <div v-for="item, index in preview_list" :key="index">
                <img :src="item" class="img-fluid" />
                <p class="mb-0">file name: {{ image_list[index].name }}</p>
                <p>size: {{ image_list[index].size/1024 }}KB</p>
              </div>
            </template>
          </div>
        </div>
      </form>
    </div>
  </div>
</div>
</template>

<script>
export default {
	data() {
		return {
			preview: null,
			image: null,
			preview_list: [],
			image_list: []
		}
	},
	methods: {
		previewImage: function(event) {
      		var input = event.target;
      		if (input.files) {
      		  var reader = new FileReader();
      		  reader.onload = (e) => {
      		    this.preview = e.target.result;
				console.log(e)
      		  }
      		  this.image=input.files[0];
      		  reader.readAsDataURL(input.files[0]);
      		}
    	},
    	previewMultiImage: function(event) {
    	  var input = event.target;
    	  var count = input.files.length;
    	  var index = 0;
    	  if (input.files) {
    	    while(count --) {
    	      var reader = new FileReader();
    	      reader.onload = (e) => {
    	        this.preview_list.push(e.target.result);
    	      }
    	        this.image_list.push(input.files[index]);
    	        reader.readAsDataURL(input.files[index]);
    	        index ++;
    	    }
    	  }
    	},
    	reset: function() {
    	  this.image = null;
    	  this.preview = null;
    	  this.image_list = [];
    	  this.preview_list = [];
    	},
		up(){
			console.log(
				 this.image," -- ",
				// this.preview," -- ",
				this.image_list, " -- ",
    	  		// this.preview_list

			)
			this.$store
              .dispatch('Up', this.image)
              .then(res => {
                //
              })
              .catch(error => {
              })
		}
	},
	computed: {
	},
}
</script>
<style></style>