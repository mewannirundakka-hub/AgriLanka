import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Header from '../../components/common/Header';
import StatCard from '../../components/common/StatCard';
import { COLORS } from '../../utils/colors';

// Mock data for crop price ranges (replace with API call)
const cropPriceData = [
  {
    id: 1,
    name: 'Rice',
    minPrice: 80,
    maxPrice: 120,
    unit: 'kg',
    trend: 'up',
    priceHistory: [
      { day: 'Mon', price: 95 },
      { day: 'Tue', price: 98 },
      { day: 'Wed', price: 100 },
      { day: 'Thu', price: 102 },
      { day: 'Fri', price: 105 },
      { day: 'Sat', price: 108 },
      { day: 'Sun', price: 110 },
    ]
  },
  {
    id: 2,
    name: 'Tomatoes',
    minPrice: 60,
    maxPrice: 90,
    unit: 'kg',
    trend: 'stable',
    priceHistory: [
      { day: 'Mon', price: 75 },
      { day: 'Tue', price: 73 },
      { day: 'Wed', price: 75 },
      { day: 'Thu', price: 74 },
      { day: 'Fri', price: 76 },
      { day: 'Sat', price: 75 },
      { day: 'Sun', price: 75 },
    ]
  },
  {
    id: 3,
    name: 'Carrots',
    minPrice: 70,
    maxPrice: 100,
    unit: 'kg',
    trend: 'down',
    priceHistory: [
      { day: 'Mon', price: 95 },
      { day: 'Tue', price: 92 },
      { day: 'Wed', price: 88 },
      { day: 'Thu', price: 86 },
      { day: 'Fri', price: 83 },
      { day: 'Sat', price: 80 },
      { day: 'Sun', price: 78 },
    ]
  },
  {
    id: 4,
    name: 'Cabbage',
    minPrice: 40,
    maxPrice: 65,
    unit: 'kg',
    trend: 'up',
    priceHistory: [
      { day: 'Mon', price: 48 },
      { day: 'Tue', price: 50 },
      { day: 'Wed', price: 52 },
      { day: 'Thu', price: 53 },
      { day: 'Fri', price: 55 },
      { day: 'Sat', price: 57 },
      { day: 'Sun', price: 58 },
    ]
  },
  {
    id: 5,
    name: 'Potatoes',
    minPrice: 50,
    maxPrice: 75,
    unit: 'kg',
    trend: 'stable',
    priceHistory: [
      { day: 'Mon', price: 62 },
      { day: 'Tue', price: 63 },
      { day: 'Wed', price: 62 },
      { day: 'Thu', price: 63 },
      { day: 'Fri', price: 62 },
      { day: 'Sat', price: 63 },
      { day: 'Sun', price: 62 },
    ]
  },
  {
    id: 6,
    name: 'Onions',
    minPrice: 90,
    maxPrice: 130,
    unit: 'kg',
    trend: 'up',
    priceHistory: [
      { day: 'Mon', price: 102 },
      { day: 'Tue', price: 105 },
      { day: 'Wed', price: 108 },
      { day: 'Thu', price: 110 },
      { day: 'Fri', price: 115 },
      { day: 'Sat', price: 118 },
      { day: 'Sun', price: 120 },
    ]
  },
  {
    id: 7,
    name: 'Beans',
    minPrice: 100,
    maxPrice: 150,
    unit: 'kg',
    trend: 'up',
    priceHistory: [
      { day: 'Mon', price: 118 },
      { day: 'Tue', price: 122 },
      { day: 'Wed', price: 125 },
      { day: 'Thu', price: 128 },
      { day: 'Fri', price: 130 },
      { day: 'Sat', price: 133 },
      { day: 'Sun', price: 135 },
    ]
  },
  {
    id: 8,
    name: 'Cucumber',
    minPrice: 45,
    maxPrice: 70,
    unit: 'kg',
    trend: 'stable',
    priceHistory: [
      { day: 'Mon', price: 58 },
      { day: 'Tue', price: 57 },
      { day: 'Wed', price: 58 },
      { day: 'Thu', price: 57 },
      { day: 'Fri', price: 58 },
      { day: 'Sat', price: 58 },
      { day: 'Sun', price: 57 },
    ]
  },
];

// Sample farmer listings (your actual crop listings)
const sampleFarmerListings = [
  {
    id: 1,
    crop: 'Tomatoes',
    quantity: 500,
    price: 75,
    location: 'Kandy District',
    harvestDate: '2026-01-28',
    postedDate: 'Jan 15, 2026',
    status: 'active',
    views: 24,
    interested: 5,
  },
  {
    id: 2,
    crop: 'Rice',
    quantity: 1000,
    price: 105,
    location: 'Anuradhapura',
    harvestDate: '2026-02-05',
    postedDate: 'Jan 18, 2026',
    status: 'active',
    views: 42,
    interested: 8,
  },
  {
    id: 3,
    crop: 'Onions',
    quantity: 300,
    price: 115,
    location: 'Nuwara Eliya',
    harvestDate: '2026-01-30',
    postedDate: 'Jan 20, 2026',
    status: 'active',
    views: 18,
    interested: 3,
  },
];

// Component for displaying crop price cards
const PriceListingCard = ({ crop, onPress }) => {
  const getTrendIcon = () => {
    if (crop.trend === 'up') return 'trending-up';
    if (crop.trend === 'down') return 'trending-down';
    return 'remove';
  };

  const getTrendColor = () => {
    if (crop.trend === 'up') return '#10b981';
    if (crop.trend === 'down') return '#ef4444';
    return '#6b7280';
  };

  return (
      <TouchableOpacity
          style={styles.priceCard}
          onPress={() => onPress(crop)}
          activeOpacity={0.7}
      >
        <View style={styles.priceCardLeft}>
          <Text style={styles.cropName}>{crop.name}</Text>
          <View style={styles.priceRange}>
            <Text style={styles.priceText}>
              Rs. {crop.minPrice} - {crop.maxPrice}
            </Text>
            <Text style={styles.unitText}>/{crop.unit}</Text>
          </View>
        </View>
        <View style={[styles.trendBadge, { backgroundColor: getTrendColor() + '20' }]}>
          <Ionicons name={getTrendIcon()} size={24} color={getTrendColor()} />
        </View>
      </TouchableOpacity>
  );
};

// Component for displaying farmer's crop listing cards
const MyListingCard = ({ listing, onPress }) => {
  return (
      <TouchableOpacity
          style={styles.myListingCard}
          onPress={() => onPress(listing)}
          activeOpacity={0.7}
      >
        <View style={styles.listingCardHeader}>
          <Text style={styles.listingCropName}>{listing.crop}</Text>
          <View style={styles.listingStatusBadge}>
            <View style={styles.statusDot} />
            <Text style={styles.listingStatusText}>Active</Text>
          </View>
        </View>

        <View style={styles.listingDetailsRow}>
          <View style={styles.listingDetail}>
            <Ionicons name="cube-outline" size={16} color={COLORS.common.gray600} />
            <Text style={styles.listingDetailText}>{listing.quantity} kg</Text>
          </View>
          <View style={styles.listingDetail}>
            <Ionicons name="cash-outline" size={16} color={COLORS.common.gray600} />
            <Text style={styles.listingDetailText}>Rs. {listing.price}/kg</Text>
          </View>
          <View style={styles.listingDetail}>
            <Ionicons name="location-outline" size={16} color={COLORS.common.gray600} />
            <Text style={styles.listingDetailText}>{listing.location}</Text>
          </View>
        </View>

        <View style={styles.listingFooter}>
          <View style={styles.listingStats}>
            <Ionicons name="eye-outline" size={14} color={COLORS.common.gray400} />
            <Text style={styles.listingStatsText}>{listing.views}</Text>
            <Ionicons name="heart-outline" size={14} color={COLORS.common.gray400} style={{ marginLeft: 12 }} />
            <Text style={styles.listingStatsText}>{listing.interested}</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={COLORS.common.gray400} />
        </View>
      </TouchableOpacity>
  );
};

// Modal for viewing all crop prices
const AllCropPricesModal = ({ visible, onClose, onCropSelect }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterTrend, setFilterTrend] = useState('all');

  const filteredCrops = cropPriceData.filter(crop => {
    const matchesSearch = crop.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTrend = filterTrend === 'all' || crop.trend === filterTrend;
    return matchesSearch && matchesTrend;
  });

  return (
      <Modal
          visible={visible}
          animationType="slide"
          transparent={false}
          onRequestClose={onClose}
      >
        <View style={styles.fullScreenModal}>
          <View style={styles.fullScreenHeader}>
            <TouchableOpacity onPress={onClose} style={styles.backButton}>
              <Ionicons name="arrow-back" size={24} color={COLORS.common.gray800} />
            </TouchableOpacity>
            <Text style={styles.fullScreenTitle}>All Market Prices</Text>
            <View style={{ width: 40 }} />
          </View>

          <View style={styles.searchContainer}>
            <Ionicons name="search" size={20} color={COLORS.common.gray400} />
            <TextInput
                style={styles.searchInput}
                placeholder="Search crops..."
                value={searchQuery}
                onChangeText={setSearchQuery}
            />
            {searchQuery.length > 0 && (
                <TouchableOpacity onPress={() => setSearchQuery('')}>
                  <Ionicons name="close-circle" size={20} color={COLORS.common.gray400} />
                </TouchableOpacity>
            )}
          </View>

          <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.filterContainer}
              contentContainerStyle={{ paddingHorizontal: 16 }}
          >
            <TouchableOpacity
                style={[styles.filterButton, filterTrend === 'all' && styles.filterButtonActive]}
                onPress={() => setFilterTrend('all')}
            >
              <Text style={[styles.filterButtonText, filterTrend === 'all' && styles.filterButtonTextActive]}>
                All
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.filterButton, filterTrend === 'up' && styles.filterButtonActive]}
                onPress={() => setFilterTrend('up')}
            >
              <Ionicons name="trending-up" size={16} color={filterTrend === 'up' ? '#fff' : '#10b981'} />
              <Text style={[styles.filterButtonText, filterTrend === 'up' && styles.filterButtonTextActive]}>
                Rising
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.filterButton, filterTrend === 'down' && styles.filterButtonActive]}
                onPress={() => setFilterTrend('down')}
            >
              <Ionicons name="trending-down" size={16} color={filterTrend === 'down' ? '#fff' : '#ef4444'} />
              <Text style={[styles.filterButtonText, filterTrend === 'down' && styles.filterButtonTextActive]}>
                Falling
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.filterButton, filterTrend === 'stable' && styles.filterButtonActive]}
                onPress={() => setFilterTrend('stable')}
            >
              <Ionicons name="remove" size={16} color={filterTrend === 'stable' ? '#fff' : '#6b7280'} />
              <Text style={[styles.filterButtonText, filterTrend === 'stable' && styles.filterButtonTextActive]}>
                Stable
              </Text>
            </TouchableOpacity>
          </ScrollView>

          <ScrollView style={styles.fullScreenContent}>
            {filteredCrops.length > 0 ? (
                filteredCrops.map((crop) => (
                    <PriceListingCard
                        key={crop.id}
                        crop={crop}
                        onPress={onCropSelect}
                    />
                ))
            ) : (
                <View style={styles.emptySearchResult}>
                  <Ionicons name="search-outline" size={64} color={COLORS.common.gray400} />
                  <Text style={styles.emptySearchText}>No crops found</Text>
                  <Text style={styles.emptySearchSubtext}>
                    Try adjusting your search or filters
                  </Text>
                </View>
            )}
          </ScrollView>
        </View>
      </Modal>
  );
};

// Modal for viewing crop price details (informational only)
const CropPriceDetailModal = ({ visible, onClose, crop }) => {
  if (!crop) return null;

  return (
      <Modal
          visible={visible}
          animationType="slide"
          transparent={true}
          onRequestClose={onClose}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{crop.name} - Market Info</Text>
              <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                <Ionicons name="close" size={24} color={COLORS.common.gray600} />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.formContainer} showsVerticalScrollIndicator={false}>
              <View style={styles.priceRangeBox}>
                <Text style={styles.priceRangeLabel}>Current Market Range</Text>
                <Text style={styles.priceRangeValue}>
                  Rs. {crop.minPrice} - {crop.maxPrice} per {crop.unit}
                </Text>
                <Text style={styles.priceRangeAvg}>
                  Average: Rs. {Math.round((crop.minPrice + crop.maxPrice) / 2)}
                </Text>
              </View>

              {crop.priceHistory && (
                  <View style={styles.priceHistorySection}>
                    <Text style={styles.priceHistoryTitle}>Last 7 Days Price Trend</Text>
                    <View style={styles.chartContainer}>
                      {crop.priceHistory.map((item, index) => {
                        const maxPriceInHistory = Math.max(...crop.priceHistory.map(h => h.price));
                        const heightPercent = (item.price / maxPriceInHistory) * 100;

                        return (
                            <View key={index} style={styles.chartBar}>
                              <Text style={styles.chartPrice}>Rs. {item.price}</Text>
                              <View style={styles.barContainer}>
                                <View
                                    style={[
                                      styles.bar,
                                      {
                                        height: `${heightPercent}%`,
                                        backgroundColor: crop.trend === 'up'
                                            ? '#10b981'
                                            : crop.trend === 'down'
                                                ? '#ef4444'
                                                : '#6b7280'
                                      }
                                    ]}
                                />
                              </View>
                              <Text style={styles.chartDay}>{item.day}</Text>
                            </View>
                        );
                      })}
                    </View>
                  </View>
              )}

              <View style={styles.insightBox}>
                <View style={styles.insightHeader}>
                  <Ionicons name="bulb" size={20} color={COLORS.farmer.primary} />
                  <Text style={styles.insightTitle}>Market Insight</Text>
                </View>
                <Text style={styles.insightText}>
                  {crop.trend === 'up' &&
                      `${crop.name} prices are trending upward. This could be a good time to list your produce.`}
                  {crop.trend === 'down' &&
                      `${crop.name} prices are declining. Consider waiting for better market conditions or adjust your pricing.`}
                  {crop.trend === 'stable' &&
                      `${crop.name} prices are stable. Consistent demand in the market.`}
                </Text>
              </View>

              <TouchableOpacity style={styles.gotItButton} onPress={onClose}>
                <Text style={styles.gotItButtonText}>Got it</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>
  );
};

// Modal for viewing listing details
const CropListingDetailModal = ({ visible, onClose, listing }) => {
  if (!listing) return null;

  const handleEdit = () => {
    Alert.alert('Edit Listing', 'Edit functionality will be implemented next!');
  };

  const handleDelete = () => {
    Alert.alert(
        'Delete Listing',
        'Are you sure you want to delete this listing?',
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Delete',
            style: 'destructive',
            onPress: () => {
              console.log('Deleting listing:', listing.id);
              Alert.alert('Success', 'Listing deleted successfully');
              onClose();
            }
          }
        ]
    );
  };

  const handleMarkAsSold = () => {
    Alert.alert(
        'Mark as Sold',
        'Mark this listing as sold?',
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Mark as Sold',
            onPress: () => {
              console.log('Marking as sold:', listing.id);
              Alert.alert('Success', 'Listing marked as sold');
              onClose();
            }
          }
        ]
    );
  };

  return (
      <Modal
          visible={visible}
          animationType="slide"
          transparent={true}
          onRequestClose={onClose}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Listing Details</Text>
              <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                <Ionicons name="close" size={24} color={COLORS.common.gray600} />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.formContainer} showsVerticalScrollIndicator={false}>
              <View style={styles.statusBadge}>
                <Ionicons name="checkmark-circle" size={20} color="#10b981" />
                <Text style={styles.statusText}>Active Listing</Text>
              </View>

              <View style={styles.detailSection}>
                <Text style={styles.detailLabel}>Crop Type</Text>
                <Text style={styles.detailValue}>{listing.crop}</Text>
              </View>

              <View style={styles.detailRow}>
                <View style={[styles.detailSection, { flex: 1 }]}>
                  <Text style={styles.detailLabel}>Quantity</Text>
                  <Text style={styles.detailValue}>{listing.quantity} kg</Text>
                </View>
                <View style={[styles.detailSection, { flex: 1 }]}>
                  <Text style={styles.detailLabel}>Price per kg</Text>
                  <Text style={styles.detailValue}>Rs. {listing.price}</Text>
                </View>
              </View>

              <View style={styles.detailSection}>
                <Text style={styles.detailLabel}>Location</Text>
                <Text style={styles.detailValue}>{listing.location}</Text>
              </View>

              <View style={styles.detailSection}>
                <Text style={styles.detailLabel}>Available From</Text>
                <Text style={styles.detailValue}>{listing.harvestDate}</Text>
              </View>

              <View style={styles.detailSection}>
                <Text style={styles.detailLabel}>Posted On</Text>
                <Text style={styles.detailValue}>{listing.postedDate}</Text>
              </View>

              <View style={styles.statsRow}>
                <View style={styles.statItem}>
                  <Ionicons name="eye-outline" size={20} color={COLORS.common.gray600} />
                  <Text style={styles.statLabel}>Views</Text>
                  <Text style={styles.statValue}>{listing.views}</Text>
                </View>
                <View style={styles.statItem}>
                  <Ionicons name="heart-outline" size={20} color={COLORS.common.gray600} />
                  <Text style={styles.statLabel}>Interested</Text>
                  <Text style={styles.statValue}>{listing.interested}</Text>
                </View>
              </View>

              <View style={styles.actionButtons}>
                <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
                  <Ionicons name="create-outline" size={20} color={COLORS.farmer.primary} />
                  <Text style={styles.editButtonText}>Edit</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.soldButton} onPress={handleMarkAsSold}>
                  <Ionicons name="checkmark-circle-outline" size={20} color="#10b981" />
                  <Text style={styles.soldButtonText}>Mark as Sold</Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
                <Ionicons name="trash-outline" size={20} color="#ef4444" />
                <Text style={styles.deleteButtonText}>Delete Listing</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>
  );
};

// Modal for adding new crop listing
const AddCropModal = ({ visible, onClose }) => {
  const [formData, setFormData] = useState({
    cropType: '',
    quantity: '',
    pricePerUnit: '',
    location: '',
    harvestDate: '',
  });
  const [showCropSelector, setShowCropSelector] = useState(true);

  const getSuggestedPrice = () => {
    const crop = cropPriceData.find(c => c.name === formData.cropType);
    if (crop) {
      const avg = Math.round((crop.minPrice + crop.maxPrice) / 2);
      return {
        min: crop.minPrice,
        max: crop.maxPrice,
        avg: avg,
        text: `Market Range: Rs. ${crop.minPrice} - ${crop.maxPrice} | Suggested: Rs. ${avg}`
      };
    }
    return null;
  };

  const handleSubmit = () => {
    if (!formData.cropType || !formData.quantity || !formData.pricePerUnit) {
      Alert.alert('Missing Information', 'Please fill in all required fields');
      return;
    }

    const price = parseFloat(formData.pricePerUnit);
    const suggestion = getSuggestedPrice();

    if (suggestion && (price < suggestion.min || price > suggestion.max)) {
      Alert.alert(
          'Price Alert',
          `Your price (Rs. ${price}) is outside the current market range (Rs. ${suggestion.min} - ${suggestion.max}). Do you want to continue?`,
          [
            { text: 'Edit Price', style: 'cancel' },
            { text: 'Continue', onPress: () => submitListing() }
          ]
      );
      return;
    }

    submitListing();
  };

  const submitListing = () => {
    console.log('Submitting crop listing:', formData);
    Alert.alert('Success', 'Your crop listing has been added successfully!');
    onClose();
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      cropType: '',
      quantity: '',
      pricePerUnit: '',
      location: '',
      harvestDate: '',
    });
    setShowCropSelector(true);
  };

  const priceInfo = getSuggestedPrice();

  return (
      <Modal
          visible={visible}
          animationType="slide"
          transparent={true}
          onRequestClose={onClose}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Add New Crop Listing</Text>
              <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                <Ionicons name="close" size={24} color={COLORS.common.gray600} />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.formContainer} showsVerticalScrollIndicator={false}>
              {showCropSelector ? (
                  <View>
                    <Text style={styles.label}>Select Crop Type *</Text>
                    <View style={styles.cropSelectorGrid}>
                      {cropPriceData.map(crop => (
                          <TouchableOpacity
                              key={crop.id}
                              style={[
                                styles.cropSelectorItem,
                                formData.cropType === crop.name && styles.cropSelectorItemActive
                              ]}
                              onPress={() => {
                                const avg = Math.round((crop.minPrice + crop.maxPrice) / 2);
                                setFormData({
                                  ...formData,
                                  cropType: crop.name,
                                  pricePerUnit: avg.toString(),
                                });
                                setShowCropSelector(false);
                              }}
                          >
                            <Text style={styles.cropSelectorText}>{crop.name}</Text>
                            <Text style={styles.cropSelectorPrice}>
                              Rs. {crop.minPrice}-{crop.maxPrice}
                            </Text>
                          </TouchableOpacity>
                      ))}
                    </View>
                  </View>
              ) : (
                  <>
                    <View style={styles.selectedCropBanner}>
                      <View>
                        <Text style={styles.selectedCropText}>
                          {formData.cropType}
                        </Text>
                        {priceInfo && (
                            <Text style={styles.selectedCropSubtext}>
                              Current market: Rs. {priceInfo.min} - {priceInfo.max}
                            </Text>
                        )}
                      </View>
                      <TouchableOpacity onPress={() => setShowCropSelector(true)}>
                        <Text style={styles.changeButton}>Change</Text>
                      </TouchableOpacity>
                    </View>

                    <View style={styles.inputGroup}>
                      <Text style={styles.label}>Quantity Available (kg) *</Text>
                      <TextInput
                          style={styles.input}
                          placeholder="e.g., 500"
                          keyboardType="numeric"
                          value={formData.quantity}
                          onChangeText={(text) => setFormData({...formData, quantity: text})}
                      />
                    </View>

                    <View style={styles.inputGroup}>
                      <Text style={styles.label}>Your Selling Price (per kg) *</Text>
                      {priceInfo && (
                          <View style={styles.priceInfoBox}>
                            <Ionicons name="information-circle" size={16} color={COLORS.farmer.primary} />
                            <Text style={styles.suggestedPrice}>{priceInfo.text}</Text>
                          </View>
                      )}
                      <TextInput
                          style={styles.input}
                          placeholder={priceInfo ? `e.g., ${priceInfo.avg}` : "Enter price"}
                          keyboardType="numeric"
                          value={formData.pricePerUnit}
                          onChangeText={(text) => setFormData({...formData, pricePerUnit: text})}
                      />
                    </View>

                    <View style={styles.inputGroup}>
                      <Text style={styles.label}>Location *</Text>
                      <TextInput
                          style={styles.input}
                          placeholder="e.g., Kandy District"
                          value={formData.location}
                          onChangeText={(text) => setFormData({...formData, location: text})}
                      />
                    </View>

                    <View style={styles.inputGroup}>
                      <Text style={styles.label}>Available From *</Text>
                      <TextInput
                          style={styles.input}
                          placeholder="e.g., 2026-01-25"
                          value={formData.harvestDate}
                          onChangeText={(text) => setFormData({...formData, harvestDate: text})}
                      />
                    </View>

                    <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                      <Text style={styles.submitButtonText}>Create Listing</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.cancelButton}
                        onPress={() => {
                          onClose();
                          resetForm();
                        }}
                    >
                      <Text style={styles.cancelButtonText}>Cancel</Text>
                    </TouchableOpacity>
                  </>
              )}
            </ScrollView>
          </View>
        </View>
      </Modal>
  );
};

const FarmerHomeScreen = () => {
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [priceDetailModalVisible, setPriceDetailModalVisible] = useState(false);
  const [selectedCropForInfo, setSelectedCropForInfo] = useState(null);
  const [showAllPricesModal, setShowAllPricesModal] = useState(false);
  const [listingDetailModalVisible, setListingDetailModalVisible] = useState(false);
  const [selectedListing, setSelectedListing] = useState(null);

  const handleAddCrop = () => {
    setAddModalVisible(true);
  };

  const handlePriceCardPress = (crop) => {
    setSelectedCropForInfo(crop);
    setPriceDetailModalVisible(true);
  };

  const handleListingPress = (listing) => {
    setSelectedListing(listing);
    setListingDetailModalVisible(true);
  };

  const handleViewAllCrops = () => {
    setShowAllPricesModal(true);
  };

  return (
      <View style={styles.container}>
        <Header title="Farmer Dashboard" />

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Stats Section */}
          <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.statsContainer}
          >
            <StatCard
                icon="cube-outline"
                label="Active Listings"
                value="3"
                color={COLORS.farmer.primary}
            />
            <StatCard
                icon="cart-outline"
                label="Pending Orders"
                value="3"
                color={COLORS.supermarket.primary}
            />
            <StatCard
                icon="cash-outline"
                label="This Month"
                value="Rs. 45K"
                color="#f59e0b"
            />
          </ScrollView>

          {/* Market Price Listings Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <View>
                <Text style={styles.sectionTitle}>Today's Market Prices</Text>
                <Text style={styles.sectionSubtitle}>
                  Tap to view price trends
                </Text>
              </View>
              <TouchableOpacity style={styles.refreshButton}>
                <Ionicons name="refresh" size={20} color={COLORS.farmer.primary} />
              </TouchableOpacity>
            </View>

            <View style={styles.priceListContainer}>
              {cropPriceData.slice(0, 4).map((crop) => (
                  <PriceListingCard
                      key={crop.id}
                      crop={crop}
                      onPress={handlePriceCardPress}
                  />
              ))}
            </View>

            <TouchableOpacity
                style={styles.viewAllButton}
                onPress={handleViewAllCrops}
            >
              <Text style={styles.viewAllText}>
                View All Crops ({cropPriceData.length})
              </Text>
              <Ionicons
                  name="arrow-forward"
                  size={20}
                  color={COLORS.farmer.primary}
              />
            </TouchableOpacity>

            <View style={styles.priceNote}>
              <Ionicons name="information-circle-outline" size={16} color={COLORS.common.gray600} />
              <Text style={styles.priceNoteText}>
                Prices updated daily based on market trends
              </Text>
            </View>
          </View>

          {/* My Listings Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>My Crop Listings</Text>
              <TouchableOpacity style={styles.addButton} onPress={handleAddCrop}>
                <Ionicons name="add" size={20} color="#fff" />
                <Text style={styles.addButtonText}>Add Crop</Text>
              </TouchableOpacity>
            </View>

            {sampleFarmerListings.map((listing) => (
                <MyListingCard
                    key={listing.id}
                    listing={listing}
                    onPress={handleListingPress}
                />
            ))}
          </View>
        </ScrollView>

        {/* All Crops Modal (Full Screen) */}
        <AllCropPricesModal
            visible={showAllPricesModal}
            onClose={() => setShowAllPricesModal(false)}
            onCropSelect={(crop) => {
              setShowAllPricesModal(false);
              setTimeout(() => {
                setSelectedCropForInfo(crop);
                setPriceDetailModalVisible(true);
              }, 300);
            }}
        />

        {/* Price Detail Modal (Informational) */}
        <CropPriceDetailModal
            visible={priceDetailModalVisible}
            onClose={() => setPriceDetailModalVisible(false)}
            crop={selectedCropForInfo}
        />

        {/* Listing Detail Modal */}
        <CropListingDetailModal
            visible={listingDetailModalVisible}
            onClose={() => setListingDetailModalVisible(false)}
            listing={selectedListing}
        />

        {/* Add Crop Modal (Full Form) */}
        <AddCropModal
            visible={addModalVisible}
            onClose={() => setAddModalVisible(false)}
        />
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.common.gray50,
  },
  content: {
    flex: 1,
  },
  statsContainer: {
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  section: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.common.gray800,
  },
  sectionSubtitle: {
    fontSize: 13,
    color: COLORS.common.gray600,
    marginTop: 2,
  },
  refreshButton: {
    padding: 8,
  },
  priceListContainer: {
    marginBottom: 12,
  },
  priceCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  priceCardLeft: {
    flex: 1,
  },
  cropName: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.common.gray800,
    marginBottom: 4,
  },
  priceRange: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  priceText: {
    fontSize: 15,
    fontWeight: '500',
    color: COLORS.farmer.primary,
  },
  unitText: {
    fontSize: 13,
    color: COLORS.common.gray600,
    marginLeft: 2,
  },
  trendBadge: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  priceNote: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.common.gray100,
    padding: 12,
    borderRadius: 8,
    gap: 8,
    marginTop: 12,
  },
  priceNoteText: {
    flex: 1,
    fontSize: 12,
    color: COLORS.common.gray600,
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.farmer.primary,
    gap: 8,
    marginBottom: 12,
  },
  viewAllText: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.farmer.primary,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.farmer.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    gap: 4,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  // My Listing Card Styles
  myListingCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  listingCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  listingCropName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.common.gray800,
  },
  listingStatusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#10b981' + '10',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 6,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#10b981',
  },
  listingStatusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#10b981',
  },
  listingDetailsRow: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 12,
  },
  listingDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  listingDetailText: {
    fontSize: 13,
    color: COLORS.common.gray600,
  },
  listingFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: COLORS.common.gray100,
  },
  listingStats: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  listingStatsText: {
    fontSize: 12,
    color: COLORS.common.gray600,
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '90%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.common.gray100,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.common.gray800,
  },
  closeButton: {
    padding: 4,
  },
  formContainer: {
    padding: 20,
  },
  cropSelectorGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginTop: 12,
  },
  cropSelectorItem: {
    width: '47%',
    backgroundColor: COLORS.common.gray50,
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: COLORS.common.gray100,
  },
  cropSelectorItemActive: {
    backgroundColor: COLORS.farmer.primary + '10',
    borderColor: COLORS.farmer.primary,
  },
  cropSelectorText: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.common.gray800,
    marginBottom: 4,
  },
  cropSelectorPrice: {
    fontSize: 12,
    color: COLORS.common.gray600,
  },
  selectedCropBanner: {
    backgroundColor: COLORS.farmer.primary + '10',
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: COLORS.farmer.primary + '30',
  },
  selectedCropText: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.farmer.primary,
  },
  selectedCropSubtext: {
    fontSize: 12,
    color: COLORS.common.gray600,
    marginTop: 2,
  },
  changeButton: {
    fontSize: 14,
    color: COLORS.farmer.primary,
    fontWeight: '600',
  },
  gotItButton: {
    backgroundColor: COLORS.farmer.primary,
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 12,
  },
  gotItButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  priceRangeBox: {
    backgroundColor: COLORS.farmer.primary + '10',
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.farmer.primary + '30',
  },
  priceRangeLabel: {
    fontSize: 14,
    color: COLORS.common.gray600,
    marginBottom: 8,
  },
  priceRangeValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.farmer.primary,
    marginBottom: 4,
  },
  priceRangeAvg: {
    fontSize: 14,
    color: COLORS.common.gray600,
  },
  insightBox: {
    backgroundColor: COLORS.common.gray50,
    padding: 16,
    borderRadius: 12,
    marginTop: 12,
  },
  insightHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  insightTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.common.gray800,
  },
  insightText: {
    fontSize: 14,
    color: COLORS.common.gray600,
    lineHeight: 20,
  },
  // Price History Chart Styles
  priceHistorySection: {
    backgroundColor: COLORS.common.gray50,
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
  priceHistoryTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.common.gray800,
    marginBottom: 16,
  },
  chartContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 150,
    paddingTop: 10,
  },
  chartBar: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  chartPrice: {
    fontSize: 10,
    color: COLORS.common.gray600,
    marginBottom: 4,
    fontWeight: '500',
  },
  barContainer: {
    width: '80%',
    height: 100,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  bar: {
    width: '100%',
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    minHeight: 20,
  },
  chartDay: {
    fontSize: 11,
    color: COLORS.common.gray600,
    marginTop: 6,
    fontWeight: '500',
  },
  submitButton: {
    backgroundColor: COLORS.farmer.primary,
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 12,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  cancelButton: {
    padding: 16,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: COLORS.common.gray600,
    fontSize: 15,
    fontWeight: '500',
  },
  // Full Screen Modal Styles
  fullScreenModal: {
    flex: 1,
    backgroundColor: COLORS.common.gray50,
  },
  fullScreenHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    paddingTop: 48,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.common.gray100,
  },
  backButton: {
    padding: 8,
  },
  fullScreenTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.common.gray800,
  },
  fullScreenContent: {
    flex: 1,
    padding: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    margin: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    gap: 12,
    borderWidth: 1,
    borderColor: COLORS.common.gray100,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: COLORS.common.gray800,
  },
  filterContainer: {
    paddingHorizontal: 0,
    marginBottom: 16,
    maxHeight: 50,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    gap: 6,
    borderWidth: 1,
    borderColor: COLORS.common.gray100,
    height: 36,
  },
  filterButtonActive: {
    backgroundColor: COLORS.farmer.primary,
    borderColor: COLORS.farmer.primary,
  },
  filterButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.common.gray800,
  },
  filterButtonTextActive: {
    color: '#fff',
  },
  emptySearchResult: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptySearchText: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.common.gray800,
    marginTop: 16,
  },
  emptySearchSubtext: {
    fontSize: 14,
    color: COLORS.common.gray600,
    marginTop: 8,
  },
  // Listing Detail Modal Styles
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#10b981' + '10',
    padding: 12,
    borderRadius: 8,
    gap: 8,
    marginBottom: 20,
  },
  statusText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#10b981',
  },
  detailSection: {
    marginBottom: 20,
  },
  detailRow: {
    flexDirection: 'row',
    gap: 16,
  },
  detailLabel: {
    fontSize: 13,
    color: COLORS.common.gray600,
    marginBottom: 6,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.common.gray800,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
    marginVertical: 20,
  },
  statItem: {
    flex: 1,
    backgroundColor: COLORS.common.gray50,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    gap: 6,
  },
  statLabel: {
    fontSize: 12,
    color: COLORS.common.gray600,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.common.gray800,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  editButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.farmer.primary + '10',
    padding: 14,
    borderRadius: 10,
    gap: 8,
    borderWidth: 1,
    borderColor: COLORS.farmer.primary,
  },
  editButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.farmer.primary,
  },
  soldButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#10b981' + '10',
    padding: 14,
    borderRadius: 10,
    gap: 8,
    borderWidth: 1,
    borderColor: '#10b981',
  },
  soldButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#10b981',
  },
  deleteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 10,
    gap: 8,
    borderWidth: 1,
    borderColor: '#ef4444',
  },
  deleteButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#ef4444',
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.common.gray800,
    marginBottom: 8,
  },
  priceInfoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.farmer.primary + '10',
    padding: 10,
    borderRadius: 8,
    marginBottom: 8,
    gap: 8,
  },
  suggestedPrice: {
    flex: 1,
    fontSize: 12,
    color: COLORS.farmer.primary,
    fontWeight: '500',
  },
  input: {
    backgroundColor: COLORS.common.gray50,
    borderWidth: 1,
    borderColor: COLORS.common.gray100,
    borderRadius: 10,
    padding: 14,
    fontSize: 15,
    color: COLORS.common.gray800,
  },
});

export default FarmerHomeScreen;