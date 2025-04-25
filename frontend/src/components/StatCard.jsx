import React from "react";

const StatCard = ({
  icon: Icon,
  title,
  value,
  iconBgColor = "bg-blue-100",
  iconTextColor = "text-blue-600",
}) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <div className="flex items-center">
        <div className={`p-3 rounded-full ${iconBgColor} ${iconTextColor} mr-4`}>
          <Icon size={24} />
        </div>
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <p className="text-2xl font-semibold">{value}</p>
        </div>
      </div>
    </div>
  );
};

export default StatCard;
