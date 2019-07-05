<template>
    <el-table>

    </el-table>

</template>

<script>
export default {
    name: 'StoreInfoBox',
    props: {
        store_id: Number,
        name: String,
        address: String,
        time: Date,
        image_id: Number,

        location: String,
        truename: String,
        phone_no: Number,
        password: String
    }
}
</script>

