import { NextRequest, NextResponse } from 'next/server';
import { INITIAL_ORDERS } from '@/data/mockProducts';
import { Order } from '@/types/ecommerce';

let serverOrders: Order[] = [...INITIAL_ORDERS];

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const orderId = searchParams.get('orderId');
    const phone = searchParams.get('phone');

    if (orderId) {
      const order = serverOrders.find(
        (o) =>
          o.id.toLowerCase() === orderId.toLowerCase() ||
          o.trackingNumber.toLowerCase() === orderId.toLowerCase()
      );
      if (!order) {
        return NextResponse.json(
          { success: false, error: 'Order not found' },
          { status: 404 }
        );
      }
      return NextResponse.json({ success: true, order });
    }

    if (phone) {
      const clean = phone.replace(/\D/g, '');
      const matched = serverOrders.filter((o) =>
        o.customer.phone.replace(/\D/g, '').includes(clean)
      );
      return NextResponse.json({ success: true, count: matched.length, orders: matched });
    }

    return NextResponse.json({
      success: true,
      count: serverOrders.length,
      orders: serverOrders,
    });
  } catch {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch orders' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body.customer || !body.items?.length) {
      return NextResponse.json(
        { success: false, error: 'Customer details and items are required' },
        { status: 400 }
      );
    }

    const randomSuffix = Math.floor(10000 + Math.random() * 90000);
    const orderId = `PEH-IND-2026-${randomSuffix}`;
    const awbNumber = `BD${Math.floor(10000000 + Math.random() * 90000000)}IN`;

    const now = new Date();
    const dateFormatted = now.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

    const newOrder: Order = {
      id: orderId,
      createdAt: dateFormatted,
      customer: body.customer,
      items: body.items,
      subtotal: body.subtotal || 0,
      stitchingTotal: body.stitchingTotal || 0,
      discount: body.discount || 0,
      couponCode: body.couponCode,
      shippingFee: body.shippingFee || 0,
      shippingMethod: body.shippingMethod || 'Express Pan-India (2-4 Days)',
      grandTotal: body.grandTotal || 0,
      paymentMethod: body.paymentMethod || 'upi',
      paymentStatus: body.paymentMethod === 'cod' ? 'Pending COD' : 'Paid',
      upiDetails: body.upiDetails,
      orderStatus: 'Confirmed',
      courierName: 'BlueDart Express Air',
      trackingNumber: awbNumber,
      estimatedDelivery: '2-4 Days via BlueDart Express Air',
      giftWrap: !!body.giftWrap,
      giftMessage: body.giftMessage,
      trackingTimeline: [
        {
          status: 'Order Placed & Confirmed',
          description: `Order received and verified via ${String(body.paymentMethod || 'UPI').toUpperCase()}. Invoice generated.`,
          location: 'Pehnava Operations Hub, New Delhi',
          timestamp: dateFormatted,
          isCompleted: true,
          isCurrent: true,
        },
      ],
    };

    serverOrders = [newOrder, ...serverOrders];

    return NextResponse.json({
      success: true,
      message: 'Order created successfully',
      order: newOrder,
    }, { status: 201 });
  } catch {
    return NextResponse.json(
      { success: false, error: 'Failed to create order' },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const { orderId, status, trackingNumber, location, description } = await req.json();
    if (!orderId || !status) {
      return NextResponse.json(
        { success: false, error: 'orderId and status are required' },
        { status: 400 }
      );
    }

    const orderIndex = serverOrders.findIndex((o) => o.id === orderId);
    if (orderIndex === -1) {
      return NextResponse.json({ success: false, error: 'Order not found' }, { status: 404 });
    }

    const targetOrder = serverOrders[orderIndex];
    const nowStr = new Date().toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    });

    const updatedTimeline = [...targetOrder.trackingTimeline];
    updatedTimeline.push({
      status: `Status changed to ${status}`,
      description: description || `Order milestone updated to ${status}`,
      location: location || 'Central Logistics Hub',
      timestamp: nowStr,
      isCompleted: true,
      isCurrent: true,
    });

    serverOrders[orderIndex] = {
      ...targetOrder,
      orderStatus: status,
      trackingNumber: trackingNumber || targetOrder.trackingNumber,
      trackingTimeline: updatedTimeline,
    };

    return NextResponse.json({
      success: true,
      message: 'Order status updated',
      order: serverOrders[orderIndex],
    });
  } catch {
    return NextResponse.json(
      { success: false, error: 'Failed to update order status' },
      { status: 500 }
    );
  }
}
