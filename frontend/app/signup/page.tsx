export default async function SignUp() {
	return (
		<div>
			signup page
			<form className='flex flex-col'>
				<input type='text' placeholder='name' />
				<input type='text' placeholder='email' />
				<input type='text' placeholder='username' />
				<input type='password' placeholder='password' />
				<input type='password' placeholder='confirm password' />
			</form>
		</div>
	);
}
