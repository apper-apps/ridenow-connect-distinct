import React, { useState, useEffect } from "react";
import ApperIcon from "@/components/ApperIcon";
import ServiceCard from "@/components/molecules/ServiceCard";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import { servicesService } from "@/services/api/servicesService";

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadServices = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await servicesService.getAll();
      setServices(data);
    } catch (err) {
      setError("Failed to load services. Please try again.");
      console.error("Error loading services:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadServices();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <Loading type="services" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-16">
        <Error message={error} onRetry={loadServices} />
      </div>
    );
  }

  if (services.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <Empty
          title="No services available"
          description="Our services are currently being updated. Please check back soon."
          icon="Car"
        />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Services</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Comprehensive transportation solutions designed to meet all your travel needs. 
          From local rides to long-distance journeys, we've got you covered.
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service) => (
<ServiceCard
            key={service.Id}
            service={service}
            link={`/services/${service.Name.toLowerCase().replace(/\s+/g, '-')}`}
          />
        ))}
      </div>

      {/* Features Section */}
      <div className="mt-16 bg-gray-50 rounded-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
          What Makes Our Services Special
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: "Shield",
              title: "Safety First",
              description: "All our drivers are verified and trained professionals"
            },
            {
              icon: "Clock",
              title: "Punctual Service",
              description: "On-time pickup and drop guaranteed"
            },
            {
              icon: "DollarSign",
              title: "Competitive Pricing",
              description: "Transparent and affordable rates"
            },
            {
              icon: "Headphones",
              title: "24/7 Support",
              description: "Round-the-clock customer assistance"
            },
            {
              icon: "Car",
              title: "Well-Maintained Fleet",
              description: "Clean, comfortable, and regularly serviced vehicles"
            },
            {
              icon: "MapPin",
              title: "GPS Tracking",
              description: "Real-time tracking for all your rides"
            }
          ].map((feature, index) => (
            <div key={index} className="text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <ApperIcon name={feature.icon} size={24} className="text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="mt-16 bg-gradient-to-r from-primary to-accent rounded-lg p-8 text-white text-center">
        <h2 className="text-2xl font-bold mb-4">Ready to Book Your Ride?</h2>
        <p className="text-lg mb-6 text-white/90">
          Choose from our wide range of services and experience the difference.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200">
            Book Now
          </button>
          <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary transition-colors duration-200">
            Call Us: +91 9876543210
          </button>
        </div>
      </div>
    </div>
  );
};

export default Services;