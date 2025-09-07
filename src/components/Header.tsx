import { AddMovie, Logout } from './image'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query';
import { logOutAPI } from '../api/auth';
import { toast } from 'react-toastify';
import { useAuthStore } from '../store/auth';

const Header = () => {
  const navigate = useNavigate();
  const {setCurrentUser} = useAuthStore();

  const {mutate, isPending} = useMutation({
    mutationFn: logOutAPI,
    onSuccess: (data: any) => {
      toast(data?.message || "Logout successful", {type: "success"})
      localStorage.clear();
      setCurrentUser(null);
      navigate("/login")
    },
    onError: (error: any) => {
      console.log(error)
    }
  })
  return (
    <header className="w-full fixed top-0 left-0 z-50 bg-[#04364A]">
      <div className="container mx-auto px-6 py-6 flex items-center justify-between">
        {/* Left: title + add button */}
        <div className="flex items-center gap-4">
          <h1 className="heading-2 text-text-primary">My movies</h1>

          <button
            type="button"
            aria-label="Add movie"
            className="cursor-pointer"
            onClick={() => navigate('/movies/add')}
          >
            <img src={AddMovie} alt="Add" className="w-5 h-5" />
          </button>
        </div>

        {/* Right: logout */}
        <div>
          <button
            type="button"
            aria-label="Logout"
            className="flex items-center gap-2 text-text-primary body-sm cursor-pointer"
            onClick={() => mutate()}
            disabled={isPending}
            >
            <span className="hidden sm:inline">Logout</span>
            <img src={Logout} alt="Logout" className="w-6 h-6" />
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
