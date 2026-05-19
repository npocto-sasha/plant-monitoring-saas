import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { usePlants } from "../context/PlantContext";
import Svg, { Polyline, Circle, Line, Text as SvgText } from "react-native-svg";

export default function Monitor({ route }) {
  const plantId = route?.params?.plantId;
  const { plants, getPlantById } = usePlants();
  const plant = getPlantById(plantId) || plants[0];

  const renderLineChart = (metric, unit, title) => {
  const history = plant.telemetryHistory || [];

  if (history.length === 0) {
    return (
      <View style={styles.emptyHistoryCard}>
        <Text style={styles.emptyHistoryTitle}>Недостаточно данных</Text>
        <Text style={styles.emptyHistoryText}>
          График появится после получения измерений с ESP32-устройства.
        </Text>
      </View>
    );
  }

  const chartWidth = 320;
  const chartHeight = 180;

  const paddingLeft = 48;
  const paddingRight = 18;
  const paddingTop = 18;
  const paddingBottom = 34;

  const values = history.map((item) => Number(item[metric]));
  const minRaw = Math.min(...values);
  const maxRaw = Math.max(...values);

  const range = maxRaw - minRaw === 0 ? 1 : maxRaw - minRaw;
  const minValue = Math.floor(minRaw - range * 0.15);
  const maxValue = Math.ceil(maxRaw + range * 0.15);
  const safeRange = maxValue - minValue === 0 ? 1 : maxValue - minValue;

  const plotWidth = chartWidth - paddingLeft - paddingRight;
  const plotHeight = chartHeight - paddingTop - paddingBottom;

  const yTicks = [
    maxValue,
    Math.round((maxValue + minValue) / 2),
    minValue,
  ];

  const getX = (index) =>
    paddingLeft + (index * plotWidth) / Math.max(history.length - 1, 1);

  const getY = (value) =>
    paddingTop + ((maxValue - value) / safeRange) * plotHeight;

  const points = history.map((item, index) => ({
    x: getX(index),
    y: getY(Number(item[metric])),
    value: item[metric],
    time: item.time,
  }));

  const pointsString = points.map((point) => `${point.x},${point.y}`).join(" ");

  return (
    <View style={styles.lineChartCard}>
      <View style={styles.lineChartHeader}>
        <Text style={styles.chartTitle}>{title}</Text>
        <Text style={styles.chartRange}>
          {minRaw}
          {unit} — {maxRaw}
          {unit}
        </Text>
      </View>

      <Svg
        width="100%"
        height={chartHeight}
        viewBox={`0 0 ${chartWidth} ${chartHeight}`}
      >
        {yTicks.map((tick, index) => {
          const y = getY(tick);

          return (
            <React.Fragment key={`${metric}-tick-${index}`}>
              <Line
                x1={paddingLeft}
                y1={y}
                x2={chartWidth - paddingRight}
                y2={y}
                stroke="#E5E7EB"
                strokeWidth="1"
              />

              <SvgText
                x={paddingLeft - 8}
                y={y + 4}
                fontSize="10"
                fill="#6B7280"
                textAnchor="end"
              >
                {tick}
                {unit}
              </SvgText>
            </React.Fragment>
          );
        })}

        <Line
          x1={paddingLeft}
          y1={paddingTop}
          x2={paddingLeft}
          y2={chartHeight - paddingBottom}
          stroke="#D1D5DB"
          strokeWidth="1"
        />

        <Line
          x1={paddingLeft}
          y1={chartHeight - paddingBottom}
          x2={chartWidth - paddingRight}
          y2={chartHeight - paddingBottom}
          stroke="#D1D5DB"
          strokeWidth="1"
        />

        <Polyline
          points={pointsString}
          fill="none"
          stroke="#115FF9"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {points.map((point, index) => (
          <Circle
            key={`${metric}-point-${index}`}
            cx={point.x}
            cy={point.y}
            r="4"
            fill="#115FF9"
          />
        ))}

        {points.map((point, index) => (
          <SvgText
            key={`${metric}-time-${index}`}
            x={point.x}
            y={chartHeight - 10}
            fontSize="10"
            fill="#6B7280"
            textAnchor="middle"
          >
            {point.time}
          </SvgText>
        ))}
      </Svg>
    </View>
  );
};

  const getTrendMessage = (metric, label, unit) => {
    const history = plant.telemetryHistory || [];

    if (history.length < 2) {
      return {
        title: label,
        message: "Недостаточно данных для анализа динамики.",
        status: "info",
      };
    }

    const firstValue = Number(history[0][metric]);
    const lastValue = Number(history[history.length - 1][metric]);
    const difference = Number((lastValue - firstValue).toFixed(1));

    if (Math.abs(difference) < 1) {
      return {
        title: label,
        message: `Показатель остается стабильным: изменение составляет ${difference}${unit}.`,
        status: "normal",
      };
    }

    if (difference > 0) {
      return {
        title: label,
        message: `Показатель увеличился на ${difference}${unit} за период наблюдения.`,
        status: "normal",
      };
    }

    return {
      title: label,
      message: `Показатель снизился на ${Math.abs(difference)}${unit} за период наблюдения.`,
      status: "warning",
    };
  };

  const getTrendStyle = (status) => {
    if (status === "normal") return styles.trendNormal;
    if (status === "warning") return styles.trendWarning;
    return styles.trendInfo;
  };
  const getStatusText = () => {
    if (plant.status === "normal") return "Состояние растения в норме";
    if (plant.status === "warning") return "Требуется внимание";
    if (plant.status === "risk") return "Высокий риск";
    return "Нет данных";
  };

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <View style={styles.headerCard}>
        <Text style={styles.title}>{plant.name}</Text>
        <Text style={styles.subtitle}>
          {plant.type} · {plant.location}
        </Text>

        <View style={styles.statusBox}>
          <Text style={styles.statusLabel}>Текущий статус</Text>
          <Text style={styles.statusValue}>{getStatusText()}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Показатели датчиков</Text>

        <View style={styles.metricCard}>
          <Text style={styles.metricLabel}>Влажность почвы</Text>
          <Text style={styles.metricValue}>
            {plant.telemetry.soilMoisture}%
          </Text>
          <Text style={styles.metricHint}>
            Определяет необходимость полива растения.
          </Text>
        </View>

        <View style={styles.metricCard}>
          <Text style={styles.metricLabel}>Температура воздуха</Text>
          <Text style={styles.metricValue}>
            {plant.telemetry.temperature}°C
          </Text>
          <Text style={styles.metricHint}>
            Помогает определить, находится ли растение в комфортных условиях.
          </Text>
        </View>

        <View style={styles.metricCard}>
          <Text style={styles.metricLabel}>Освещенность</Text>
          <Text style={styles.metricValue}>{plant.telemetry.light} lx</Text>
          <Text style={styles.metricHint}>
            Показывает, достаточно ли света получает растение.
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Рекомендация</Text>
        <View style={styles.recommendationCard}>
          <Text style={styles.recommendationText}>{plant.recommendation}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Анализ динамики</Text>

        {[
          getTrendMessage("soilMoisture", "Влажность почвы", "%"),
          getTrendMessage("temperature", "Температура воздуха", "°C"),
          getTrendMessage("light", "Освещенность", " lx"),
        ].map((trend, index) => (
          <View
            key={`trend-${index}`}
            style={[styles.trendCard, getTrendStyle(trend.status)]}
          >
            <Text style={styles.trendTitle}>{trend.title}</Text>
            <Text style={styles.trendMessage}>{trend.message}</Text>
          </View>
        ))}
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Графики показателей</Text>

        {renderLineChart("soilMoisture", "%", "Влажность почвы")}
        {renderLineChart("temperature", "°C", "Температура воздуха")}
        {renderLineChart("light", " lx", "Освещенность")}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>История измерений</Text>

        {plant.telemetryHistory && plant.telemetryHistory.length > 0 ? (
          plant.telemetryHistory.map((item, index) => (
            <View key={`${plant.id}-history-${index}`} style={styles.historyCard}>
              <View style={styles.historyHeader}>
                <Text style={styles.historyTime}>{item.time}</Text>
                <Text style={styles.historyLabel}>замер</Text>
              </View>

              <View style={styles.historyMetrics}>
                <View style={styles.historyMetricBox}>
                  <Text style={styles.historyMetricValue}>
                    {item.soilMoisture}%
                  </Text>
                  <Text style={styles.historyMetricLabel}>Влажность</Text>
                </View>

                <View style={styles.historyMetricBox}>
                  <Text style={styles.historyMetricValue}>
                    {item.temperature}°C
                  </Text>
                  <Text style={styles.historyMetricLabel}>Температура</Text>
                </View>

                <View style={styles.historyMetricBox}>
                  <Text style={styles.historyMetricValue}>{item.light} lx</Text>
                  <Text style={styles.historyMetricLabel}>Свет</Text>
                </View>
              </View>
            </View>
          ))
        ) : (
          <View style={styles.emptyHistoryCard}>
            <Text style={styles.emptyHistoryTitle}>История пока отсутствует</Text>
            <Text style={styles.emptyHistoryText}>
              После подключения ESP32-устройства здесь появятся измерения с датчиков.
            </Text>
          </View>
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Устройство</Text>
        <View style={styles.deviceCard}>
          <Text style={styles.deviceLabel}>ESP32</Text>
          <Text style={styles.deviceValue}>
            {plant.deviceId ? plant.deviceId : "Устройство не подключено"}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F4F7FB",
  },
  content: {
    padding: 16,
    paddingBottom: 32,
  },
  headerCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 18,
    marginBottom: 18,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  title: {
    fontSize: 30,
    fontWeight: "700",
    color: "#16213E",
  },
  subtitle: {
    marginTop: 6,
    fontSize: 15,
    color: "#6B7280",
  },
  statusBox: {
    marginTop: 18,
    borderRadius: 14,
    backgroundColor: "#EEF4FF",
    padding: 14,
  },
  statusLabel: {
    fontSize: 13,
    color: "#6B7280",
  },
  statusValue: {
    marginTop: 4,
    fontSize: 18,
    fontWeight: "700",
    color: "#115FF9",
  },
  section: {
    marginBottom: 18,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#16213E",
    marginBottom: 10,
  },
  metricCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    marginBottom: 10,
  },
  metricLabel: {
    fontSize: 15,
    color: "#6B7280",
  },
  metricValue: {
    marginTop: 6,
    fontSize: 28,
    fontWeight: "700",
    color: "#115FF9",
  },
  metricHint: {
    marginTop: 6,
    fontSize: 14,
    lineHeight: 20,
    color: "#374151",
  },
  recommendationCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
  },
  recommendationText: {
    fontSize: 15,
    lineHeight: 22,
    color: "#374151",
  },
  deviceCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
  },
  deviceLabel: {
    fontSize: 15,
    color: "#6B7280",
  },
  deviceValue: {
    marginTop: 6,
    fontSize: 18,
    fontWeight: "700",
    color: "#16213E",
  },
  historyCard: {
  backgroundColor: "#FFFFFF",
  borderRadius: 16,
  padding: 14,
  marginBottom: 10,
  },
  historyHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  historyTime: {
    fontSize: 17,
    fontWeight: "700",
    color: "#16213E",
  },
  historyLabel: {
    fontSize: 13,
    color: "#6B7280",
  },
  historyMetrics: {
    flexDirection: "row",
    gap: 8,
  },
  historyMetricBox: {
    flex: 1,
    backgroundColor: "#F4F7FB",
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 6,
    alignItems: "center",
  },
  historyMetricValue: {
    fontSize: 15,
    fontWeight: "700",
    color: "#115FF9",
  },
  historyMetricLabel: {
    marginTop: 4,
    fontSize: 11,
    color: "#6B7280",
  },
  emptyHistoryCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
  },
  emptyHistoryTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#16213E",
  },
  emptyHistoryText: {
    marginTop: 8,
    fontSize: 14,
    lineHeight: 21,
    color: "#6B7280",
  },
    chartTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#16213E",
    marginBottom: 8,
    marginTop: 8,
  },
  lineChartCard: {
  backgroundColor: "#FFFFFF",
  borderRadius: 16,
  padding: 14,
  marginBottom: 14,
  },
  lineChartHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
    gap: 12,
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#16213E",
  },
  chartRange: {
    fontSize: 13,
    color: "#6B7280",
  },
  trendCard: {
  borderRadius: 16,
  padding: 14,
  marginBottom: 10,
  },
  trendNormal: {
    backgroundColor: "#DFF7E8",
  },
  trendWarning: {
    backgroundColor: "#FFF3CD",
  },
  trendInfo: {
    backgroundColor: "#E5EDFD",
  },
  trendTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#16213E",
  },
  trendMessage: {
    marginTop: 6,
    fontSize: 14,
    lineHeight: 21,
    color: "#374151",
  },
});