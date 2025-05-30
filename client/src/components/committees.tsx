import { useQuery } from "@tanstack/react-query";
import { useStaggerAnimation } from "@/hooks/use-gsap";
import type { Committee } from "@shared/schema";

const colorClasses = {
  blue: "from-blue-500 to-blue-600",
  green: "from-green-500 to-green-600",
  purple: "from-purple-500 to-purple-600",
  orange: "from-orange-500 to-orange-600",
  red: "from-red-500 to-red-600",
  teal: "from-teal-500 to-teal-600",
};

const bgColorClasses = {
  blue: "bg-blue-100 text-blue-700",
  green: "bg-green-100 text-green-700",
  purple: "bg-purple-100 text-purple-700",
  orange: "bg-orange-100 text-orange-700",
  red: "bg-red-100 text-red-700",
  teal: "bg-teal-100 text-teal-700",
};

export default function Committees() {
  const { data: committees, isLoading, error } = useQuery<Committee[]>({
    queryKey: ["/api/committees"],
  });

  useStaggerAnimation(".committee-card", 0.1);

  if (isLoading) {
    return (
      <section id="committees" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Our{" "}
              <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
                Judges
              </span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl p-8 shadow-lg">
                <div className="w-16 h-16 bg-gray-200 rounded-xl mb-6 animate-pulse"></div>
                <div className="h-6 bg-gray-200 rounded mb-4 animate-pulse"></div>
                <div className="space-y-2 mb-6">
                  <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                </div>
                <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="committees" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Our Judges
            </h2>
            <div className="bg-red-50 border border-red-200 rounded-lg p-8">

              <p className="text-red-700">
                Judges to be announced soon. Trust me its worth the wait.
              </p>
              <p className="text-red-700">
                Please check back later for the latest judges.
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!committees || committees.length === 0) {
    // Keep the existing loading and error states, but if there are no committees (judges)
    // we can also show the 'revealed soon' message or a specific 'no judges yet' message.
    // For now, let's assume the user wants the main content area to show the 'revealed soon' message
    // regardless of the committees query outcome if it's not loading or erroring.
    // So, the main return block will be modified.
  }

  return (
    <section id="committees" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Our{" "}
            <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
              Judges
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Judges will be revealed soon. Stay tuned for updates!
          </p>
        </div>

        <div className="text-center">
          <p className="text-2xl text-gray-700 font-semibold">
            Judges will be revealed soon
          </p>
        </div>
      </div>
    </section>
  );
}
