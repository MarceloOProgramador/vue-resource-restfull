<template>
    
    <div v-if="loading"> 

        <figure>

            <img src="../../assets/loading.gif" alt="Loading image" class="loading">

        </figure>
        
    </div>

</template>

<script>
export default {

    props : {

        loading : {

            type : Boolean,
            required : true,
            default : false

        }

    }

}
</script>

<style scoped>

.loading {max-width: 70px;}

</style>
