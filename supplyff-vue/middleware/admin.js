export default function ({ $auth, redirect }) {
    if (!$auth.user.user.admin) {
        return redirect('/')
    }
}