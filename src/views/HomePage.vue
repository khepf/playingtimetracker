  
<template>
<v-container fluid>
	<v-card max-width="400" class="mx-auto mt-5">
		<v-card-title>
			<v-img contain
        :src="`/images/logo.png`"></v-img>
		</v-card-title>
		<v-card-text>

		</v-card-text>
		<v-divider></v-divider>
		<v-card-actions>
			<v-btn to="/register" color="success">Register</v-btn>
			<v-spacer></v-spacer>
			<v-btn to="/login" color="info">Login</v-btn>
		</v-card-actions>
	</v-card>
</v-container>

</template>

<script>
export default {
name: 'LoginPage',
data() {
  return {
    showPassword: false
  };
}
};
</script>

<style></style>
