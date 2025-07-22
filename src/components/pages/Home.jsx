import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ApperIcon from "@/components/ApperIcon";
import BookingWidget from "@/components/organisms/BookingWidget";
import ServiceCard from "@/components/molecules/ServiceCard";
import VehicleCard from "@/components/molecules/VehicleCard";
import Button from "@/components/atoms/Button";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import { servicesService } from "@/services/api/servicesService";
import { vehiclesService } from "@/services/api/vehiclesService";

const Home = () => {
  const [services, setServices] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadData = async () => {
    try {
      setLoading(true);
      setError("");
      
      const [servicesData, vehiclesData] = await Promise.all([
        servicesService.getAll(),
        vehiclesService.getAll()
      ]);
      
      setServices(servicesData.slice(0, 6));
      setVehicles(vehiclesData.slice(0, 3));
    } catch (err) {
      setError("Failed to load data. Please try again.");
      console.error("Error loading data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  if (loading) {
    return <Loading type="hero" />;
  }

  if (error) {
    return <Error message={error} onRetry={loadData} />;
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-accent text-white">
        <div className="container mx-auto px-4 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Reliable Taxi Service in Your City
              </h1>
              <p className="text-xl mb-8 text-white/90">
Book your ride now with professional drivers, transparent pricing, and 24/7 availability.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/book">
                  <Button variant="secondary" size="lg">
                    <ApperIcon name="Car" size={20} />
                    Book Now
                  </Button>
                </Link>
                <Link to="/track">
                  <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary">
                    <ApperIcon name="MapPin" size={20} />
                    Track Ride
                  </Button>
                </Link>
              </div>
            </div>
            <div>
              <BookingWidget />
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose RideNow Connect?</h2>
            <p className="text-xl text-gray-600">Experience the difference with our premium taxi service</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: "Clock",
                title: "24/7 Availability",
                description: "Round-the-clock service for all your transportation needs"
              },
              {
                icon: "Shield",
                title: "Professional Drivers",
                description: "Experienced and verified drivers for your safety"
              },
              {
                icon: "DollarSign",
                title: "Transparent Pricing",
                description: "No hidden charges, upfront pricing for all rides"
              },
              {
                icon: "Heart",
                title: "Clean & Sanitized",
                description: "Regularly sanitized vehicles for your health"
              }
            ].map((feature, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-4">
                  <ApperIcon name={feature.icon} size={32} className="text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Services</h2>
            <p className="text-xl text-gray-600">Comprehensive transportation solutions for every need</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
<ServiceCard
                key={service.Id}
                service={service}
                link={`/services/${service.Name.toLowerCase().replace(/\s+/g, '-')}`}
              />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link to="/services">
              <Button variant="outline" size="lg">
                View All Services
                <ApperIcon name="ArrowRight" size={20} />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Fleet Showcase */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Fleet</h2>
            <p className="text-xl text-gray-600">Choose from our wide range of vehicles</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {vehicles.map((vehicle) => (
              <VehicleCard
                key={vehicle.Id}
                vehicle={vehicle}
                onBook={() => {}}
              />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link to="/fleet">
              <Button variant="outline" size="lg">
                View All Vehicles
                <ApperIcon name="ArrowRight" size={20} />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What Our Customers Say</h2>
            <p className="text-xl text-gray-600">Real feedback from satisfied customers</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Rajesh Kumar",
                rating: 5,
                comment: "Excellent service! The driver was punctual and the car was clean. Highly recommended!"
              },
              {
                name: "Priya Sharma",
                rating: 5,
                comment: "Used their airport transfer service. Very professional and affordable pricing."
              },
              {
                name: "Amit Patel",
                rating: 5,
                comment: "Great experience for outstation travel. The driver was courteous and knowledgeable."
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-md">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                    <ApperIcon name="User" size={24} className="text-gray-500" />
                  </div>
                  <div className="ml-4">
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <div className="flex items-center">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <ApperIcon key={i} name="Star" size={16} className="text-accent fill-current" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 italic">"{testimonial.comment}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Download App */}
      <section className="py-16 bg-gradient-to-r from-secondary to-primary text-white">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Download Our App</h2>
            <p className="text-xl mb-8 text-white/90">
              Book rides faster with our mobile app. Available on all platforms.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="flex items-center space-x-3 bg-white/10 px-6 py-3 rounded-lg">
                <ApperIcon name="Smartphone" size={24} />
                <div className="text-left">
                  <div className="text-sm">Download on the</div>
                  <div className="font-semibold">App Store</div>
                </div>
              </div>
              <div className="flex items-center space-x-3 bg-white/10 px-6 py-3 rounded-lg">
                <ApperIcon name="Smartphone" size={24} />
                <div className="text-left">
                  <div className="text-sm">Get it on</div>
                  <div className="font-semibold">Google Play</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;