
import Image from '../../assets/banner.jpg'
const Banner = () => {
  return (
    <section
    className="bg-gray-900 text-white mb-10 rounded-2xl bg-no-repeat bg-cover 
    h-[600px] lg:h-[500px] bg-center"  style={{backgroundImage: `url(${Image})`}}>
    <div className="mx-auto  px-4 py-32 lg:flex lg:h-screen lg:items-center">
        <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-white bg-clip-text text-3xl font-bold text-transparent sm:text-4xl ">
            Discover an exceptional cooking className tailored for you!
            </h1>
            <p className="mx-auto mt-4 max-w-xl sm:text-base/relaxed text-[#FFFFFF]">
                Yes, you can run unit tests and view the results directly within the app. The integrated testing
                features allow for a streamlined
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <div>
                <a className="block w-full  px-6 py-3 bg-[#0BE58A]  font-bold  border-[#1DD10066] lg:text-lg  text-black focus:outline-none focus:ring active:text-opacity-75 sm:w-auto rounded-full"
                    href="">
                    Explore Now
                </a>
                </div>
                <div>
                <a className="block w-full  px-6 py-3 bg-transparent  font-bold border border-white lg:text-lg  text-white focus:outline-none focus:ring active:text-opacity-75 sm:w-auto rounded-full"
                    href="">
                   Our Feedback
                </a>
                </div>
            </div>
        </div>
    </div>
    </section>
  )
}

export default Banner
