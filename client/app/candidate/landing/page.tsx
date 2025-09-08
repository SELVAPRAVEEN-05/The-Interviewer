"use client";
import Footer from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { Image } from "@nextui-org/react";
import {
  ArrowRight,
  Award,
  BarChart3,
  CheckCircle,
  Clock,
  Code,
  FileText,
  Play,
  Shield,
  Star,
  Target,
  Users,
  Zap,
} from "lucide-react";
import { useRouter } from "next/navigation";

export const Landing = () => {
  const router = useRouter();

  const testimonials = [
    {
      text: "This platform helped me crack my dream job at Google! The coding challenges were exactly like real interviews.",
      name: "Sarah Chen",
      role: "Software Engineer at Google",
      rating: 5,
      image: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      text: "The interview simulation feature reduced my anxiety significantly. I felt prepared and confident.",
      name: "Raj Patel",
      role: "Full Stack Developer at Microsoft",
      rating: 5,
      image: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      text: "Amazing feedback system! I could track my progress and improve my weak areas systematically.",
      name: "Emily Rodriguez",
      role: "Frontend Developer at Spotify",
      rating: 5,
      image: "https://randomuser.me/api/portraits/women/65.jpg",
    },
  ];

  const features = [
    {
      icon: <Code className="w-8 h-8" />,
      title: "Real-Time Coding Environment",
      description:
        "Practice with industry-standard coding challenges in a live environment with syntax highlighting.",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "One-on-One Interview Sessions",
      description:
        "Experience authentic interview scenarios with experienced interviewers from top companies.",
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Instant Performance Analytics",
      description:
        "Get detailed feedback on your coding skills, communication, and problem-solving approach.",
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Time-Tracked Assessments",
      description:
        "Improve your speed and efficiency with timed coding challenges that mirror real interviews.",
    },
    {
      icon: <FileText className="w-8 h-8" />,
      title: "Comprehensive Profile Tracking",
      description:
        "Monitor your progress with detailed history of interviews, scores, and improvement areas.",
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Secure & Reliable Platform",
      description:
        "Your data and code submissions are protected with enterprise-grade security measures.",
    },
  ];

  const steps = [
    {
      number: "01",
      title: "Sign Up & Get Approved",
      description:
        "Create your candidate profile and wait for admin approval to access the platform.",
      icon: <CheckCircle className="w-6 h-6" />,
    },
    {
      number: "02",
      title: "Schedule Your Interview",
      description:
        "Book one-on-one sessions with experienced interviewers at your convenient time.",
      icon: <Users className="w-6 h-6" />,
    },
    {
      number: "03",
      title: "Solve Coding Challenges",
      description:
        "Demonstrate your technical skills through carefully designed coding problems.",
      icon: <Code className="w-6 h-6" />,
    },
    {
      number: "04",
      title: "Receive Detailed Feedback",
      description:
        "Get comprehensive evaluation reports and actionable insights for improvement.",
      icon: <Target className="w-6 h-6" />,
    },
  ];

  return (
    <div className="min-h-screen w-full bg-white text-black">
      <Navbar />

      {/* Hero Section */}
      <section id="hero" className="relative">
        {/* <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22%23333%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%223%22/%3E%3C/g%3E%3C/svg%3E')]"></div> */}

        <div className="relative min-h-screen px-4 sm:px-8 md:px-16 lg:px-24 pt-20 pb-32 bg-gradient-to-r from-blue-50 via-white to-blue-100">
          <div className="text-center transform transition-all duration-1000">
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 border border-purple-200 mb-8">
              <Zap className="w-4 h-4 mr-2 text-purple-600" />
              <span className="text-sm font-medium text-purple-600">
                Your Career Journey Starts Here
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-black mb-6 leading-tight">
              <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-purple-800 bg-clip-text text-transparent">
                Launch Your
              </span>
              <br />
              <span className="text-black">Dream Career</span>
            </h1>

            {/* Subheading */}
            <p className="text-lg sm:text-xl md:text-2xl text-gray-700 mb-12 max-w-3xl mx-auto leading-relaxed">
              Master coding interviews with our AI-powered platform. Practice
              with real interviewers, solve challenging problems, and get the
              job you deserve.
            </p>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <button
                onClick={() => router.push("/register")}
                className="group relative px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl text-white font-semibold text-base sm:text-lg transition-all duration-300 hover:shadow-lg hover:shadow-pink-300/50 hover:scale-105 flex items-center"
              >
                <Play className="w-5 h-5 mr-2" />
                Start Your Journey
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>

              <button className="px-6 sm:px-8 py-3 sm:py-4 border-2 border-purple-300 rounded-xl text-black font-semibold text-base sm:text-lg hover:bg-purple-50 transition-all duration-300 hover:border-purple-500">
                Learn More
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 px-4 sm:px-0">
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-purple-600 mb-2">
                  10K+
                </div>
                <div className="text-gray-600 text-sm sm:text-base">
                  Successful Interviews
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-pink-600 mb-2">
                  95%
                </div>
                <div className="text-gray-600 text-sm sm:text-base">
                  Job Success Rate
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-purple-600 mb-2">
                  500+
                </div>
                <div className="text-gray-600 text-sm sm:text-base">
                  Partner Companies
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section
        id="how-it-works"
        className="py-20 px-4 sm:px-8 md:px-16 lg:px-24 bg-gray-50"
      >
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black mb-6">
            How It{" "}
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Works
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-700 max-w-2xl mx-auto">
            Four simple steps to transform your interview skills and land your
            dream job
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative group">
              <div className="bg-white shadow-md border border-gray-200 rounded-2xl p-8 h-full hover:border-purple-400 transition-all duration-300 hover:scale-105">
                <div className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
                  {step.number}
                </div>
                <div className="text-purple-600 mb-6">{step.icon}</div>
                <h3 className="text-lg sm:text-xl font-bold text-black mb-4">
                  {step.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 px-4 sm:px-8 md:px-16 lg:px-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black mb-6">
            Powerful{" "}
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Features
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-700 max-w-2xl mx-auto">
            Everything you need to excel in technical interviews and showcase
            your skills
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="group">
              <div className="bg-white shadow-md border border-gray-200 rounded-2xl p-8 h-full hover:border-purple-400 transition-all duration-300 hover:scale-105">
                <div className="text-purple-600 mb-6 group-hover:text-pink-600 transition-colors">
                  {feature.icon}
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-black mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section
        id="testimonials"
        className="py-20 px-4 sm:px-8 md:px-16 lg:px-24 bg-gray-50"
      >
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black mb-6">
            Success{" "}
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Stories
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-700">
            Real experiences from candidates who made it
          </p>
        </div>

        <div className="flex space-x-6 animate-scroll hover:[animation-play-state:paused]">
          {[...testimonials, ...testimonials].map((testimonial, index) => (
            <div
              key={index}
              className="min-w-[280px] sm:min-w-[350px] max-w-sm bg-white shadow-lg rounded-2xl p-6 flex flex-col"
            >
              <div className="flex items-center mb-4">
                <Image
                  src={testimonial.image}
                  alt={testimonial.name}
                  width={50}
                  height={50}
                  className="rounded-full border"
                />
                <div className="ml-3">
                  <div className="font-semibold text-gray-900">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-gray-500">
                    {testimonial.role}
                  </div>
                </div>
              </div>
              <p className="text-gray-700 mb-4 text-sm sm:text-base leading-relaxed">
                “{testimonial.text}”
              </p>
              <div className="flex mt-auto">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 fill-current"
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section id="cta" className="py-20 px-4 sm:px-8 md:px-16 lg:px-24">
        <div className="bg-gradient-to-r from-blue-50 via-white to-blue-100 backdrop-blur-sm border border-purple-200 rounded-3xl p-8 sm:p-12 md:p-16 text-center">
          <Award className="w-12 sm:w-16 h-12 sm:h-16 text-purple-600 mx-auto mb-8" />
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black mb-6">
            Ready to Transform Your Career?
          </h2>
          <p className="text-lg sm:text-xl text-gray-700 mb-10 max-w-2xl mx-auto">
            Join thousands of successful candidates who used our platform to
            land their dream jobs. Your next career breakthrough is just one
            click away.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button 
            onClick={() => router.push("/register")}
            className="group px-8 sm:px-10 py-4 sm:py-5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl text-white font-bold text-lg sm:text-xl transition-all duration-300 hover:shadow-lg hover:shadow-pink-300/50 hover:scale-105 flex items-center">
              Register Now
              <ArrowRight className="w-5 sm:w-6 h-5 sm:h-6 ml-3 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
            onClick={() => router.push("/login")}
             className="px-8 sm:px-10 py-4 sm:py-5 border-2 border-purple-300 rounded-xl text-black font-bold text-lg sm:text-xl hover:bg-purple-50 transition-all duration-300 hover:border-purple-500">
              Sign In
            </button>
          </div>
          <p className="text-xs sm:text-sm text-gray-500 mt-6">
            No credit card required • Free to start • Join 50,000+ candidates
          </p>
        </div>
      </section>

      {/* Auto-scroll animation */}
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll {
          display: flex;
          animation: scroll 25s linear infinite;
          width: max-content;
        }
      `}</style>

      <Footer />
    </div>
  );
};

export default Landing;
