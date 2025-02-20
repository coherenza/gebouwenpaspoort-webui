export interface WGS84BoundingBox {
  LowerCorner: string;
  UpperCorner: string;
}

export interface FeatureType {
  Name: string;
  Title: string;
  Abstract: string;
  Keywords: {
    Keyword: string[];
  };
  DefaultCRS: string;
  OtherCRS: string[];
  OutputFormats: {
    Format: string[];
  };
  WGS84BoundingBox: WGS84BoundingBox;
  MetadataURL: {
    href: string;
  };
}

export interface WFSCapabilities {
  ServiceIdentification: {
    Title: string;
    Abstract: string;
    Keywords: {
      Keyword: string[];
    };
    ServiceType: string;
    ServiceTypeVersion: string;
    Fees: string;
    AccessConstraints: string;
  };
  ServiceProvider: {
    ProviderName: string;
    ProviderSite: {
      href: string;
    };
    ServiceContact: {
      IndividualName: string;
      ContactInfo: {
        Address: {
          City: string;
          Country: string;
          ElectronicMailAddress: string;
        };
        OnlineResource: {
          href: string;
        };
      };
    };
  };
  OperationsMetadata: {
    Operation: Array<{
      name: string;
      DCP: {
        HTTP: {
          Get?: { href: string };
          Post?: { href: string };
        };
      };
      Parameter?: {
        name: string;
        AllowedValues: {
          Value: string[];
        };
      };
    }>;
  };
  FeatureTypeList: {
    FeatureType: FeatureType[];
  };
}

export interface WFSService {
  id: string;
  name: string;
  url: string;
  description?: string;
}
