import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ApperIcon from "@/components/ApperIcon";
import VehicleCard from "@/components/molecules/VehicleCard";
import Button from "@/components/atoms/Button";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import { vehiclesService } from "@/services/api/vehiclesService";

const Fleet = () => {
const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const loadVehicles = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await vehiclesService.getAll();
      setVehicles(data);
    } catch (err) {
      setError("Failed to load vehicles. Please try again.");
      console.error("Error loading vehicles:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadVehicles();
  }, []);

  const categories = [
    { value: "all", label: "All Vehicles" },
    { value: "Hatchback", label: "Hatchback" },
    { value: "Sedan", label: "Sedan" },
    { value: "SUV", label: "SUV" },
    { value: "Luxury", label: "Luxury" },
    { value: "Tempo Traveller", label: "Tempo Traveller" }
  ];

  const filteredVehicles = selectedCategory === "all" 
    ? vehicles 
    : vehicles.filter(vehicle => vehicle.category === selectedCategory);

  const handleBookVehicle = (vehicle) => {
    console.log("Booking vehicle:", vehicle);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <Loading type="fleet" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-16">
        <Error message={error} onRetry={loadVehicles} />
      </div>
    );
  }

  if (vehicles.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <Empty
          title="No vehicles available"
          description="Our fleet is currently being updated. Please check back soon."
          icon="Car"
        />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Fleet</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Choose from our diverse range of well-maintained vehicles. 
          From budget-friendly options to luxury rides, we have something for everyone.
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 justify-center mb-12">
        {categories.map((category) => (
          <button
            key={category.value}
            onClick={() => setSelectedCategory(category.value)}
            className={`px-6 py-2 rounded-full font-medium transition-colors duration-200 ${
              selectedCategory === category.value
                ? "bg-primary text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {category.label}
          </button>
        ))}
      </div>

      {/* Vehicles Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredVehicles.map((vehicle) => (
          <VehicleCard
            key={vehicle.Id}
            vehicle={vehicle}
            onBook={handleBookVehicle}
          />
        ))}
      </div>

      {/* Fleet Features */}
      <div className="mt-16 bg-gray-50 rounded-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
          Fleet Features & Standards
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              icon: "Shield",
              title: "Safety Standards",
              description: "All vehicles undergo regular safety inspections"
            },
            {
              icon: "Wrench",
              title: "Regular Maintenance",
              description: "Professional servicing and maintenance schedule"
            },
            {
              icon: "Thermometer",
              title: "Climate Control",
              description: "Air conditioning in all vehicles"
            },
            {
              icon: "MapPin",
              title: "GPS Tracking",
              description: "Real-time location tracking for safety"
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
        <h2 className="text-2xl font-bold mb-4">Ready to Book?</h2>
        <p className="text-lg mb-6 text-white/90">
          Choose your preferred vehicle and book your ride now.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/book">
            <Button variant="secondary" size="lg">
              Book Now
            </Button>
          </Link>
          <Link to="/contact">
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary">
              Contact Us
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Fleet;